import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy, limit, doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '../../firebase';
import {
    LineChart,
    Line,
    Area,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell
} from 'recharts';
import { Activity, Clock, Users, Calendar, Shield, Trash2, Plus } from 'lucide-react';
import './analyticsView.scss';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#a855f7', '#ef4444'];
const SECTION_NAMES = {
    hero_section: "Sekcja Główna (Hero)",
    scope_section: "Co robimy (Scope)",
    why_important_section: "Dlaczego warto",
    inspection_form_section: "Formularz Wyceny",
    timeline_section: "Jak działamy (Timeline)",
    faq_section: "FAQ"
};

export default function AnalyticsView() {
    const [pageViews, setPageViews] = useState([]);
    const [sectionTime, setSectionTime] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentDateInterval, setCurrentDateInterval] = useState('7 dni');

    const [ignoredIps, setIgnoredIps] = useState([]);
    const [currentIp, setCurrentIp] = useState("");
    const [newIp, setNewIp] = useState("");

    useEffect(() => {
        const fetchAnalyticsData = async () => {
            setLoading(true);
            try {
                // Fetch Page Views (sort by date desc, limit to last 30 days)
                const pvQuery = query(collection(db, 'page_views'), orderBy('date', 'desc'), limit(30));
                const pvSnapshot = await getDocs(pvQuery);

                let pViews = [];
                pvSnapshot.forEach((doc) => {
                    pViews.push({ date: doc.id, ...doc.data() });
                });

                // Reverse so chronological order left to right on chart
                pViews.reverse();
                setPageViews(pViews);

                // Fetch Section Time
                const stQuery = query(collection(db, 'section_time'), orderBy('date', 'desc'), limit(30));
                const stSnapshot = await getDocs(stQuery);

                let sTimes = [];
                stSnapshot.forEach((doc) => {
                    sTimes.push({ date: doc.id, ...doc.data() });
                });
                setSectionTime(sTimes);

            } catch (error) {
                console.error('Błąd pobierania analityki:', error);
            } finally {
                setLoading(false);
            }
        };

        const fetchSettings = async () => {
            try {
                const settingsDoc = await getDoc(doc(db, "settings", "analytics"));
                if (settingsDoc.exists()) {
                    setIgnoredIps(settingsDoc.data().ignoredIps || []);
                }

                const cachedIp = sessionStorage.getItem("current_ip");
                if (cachedIp) {
                    setCurrentIp(cachedIp);
                } else {
                    const response = await fetch("https://api.ipify.org?format=json");
                    const data = await response.json();
                    setCurrentIp(data.ip);
                    sessionStorage.setItem("current_ip", data.ip);
                }
            } catch (error) {
                console.error("Błąd pobierania ustawień analityki:", error);
            }
        };

        fetchAnalyticsData();
        fetchSettings();
    }, []);

    const handleAddIp = async (ipToAdd) => {
        if (!ipToAdd.trim()) return;
        try {
            const docRef = doc(db, "settings", "analytics");
            const docSnap = await getDoc(docRef);
            if (!docSnap.exists()) {
                await setDoc(docRef, { ignoredIps: [ipToAdd] });
            } else {
                await updateDoc(docRef, {
                    ignoredIps: arrayUnion(ipToAdd)
                });
            }
            setIgnoredIps(prev => [...new Set([...prev, ipToAdd])]);
            setNewIp("");
            if (ipToAdd === currentIp) {
                sessionStorage.setItem("is_ip_ignored", "true");
            }
        } catch (error) {
            console.error("Błąd dodawania IP:", error);
            alert("Wystąpił błąd podczas dodawania IP. Sprawdź logi by poznać szczegóły.");
        }
    };

    const handleRemoveIp = async (ipToRemove) => {
        try {
            const docRef = doc(db, "settings", "analytics");
            await updateDoc(docRef, {
                ignoredIps: arrayRemove(ipToRemove)
            });
            setIgnoredIps(prev => prev.filter(ip => ip !== ipToRemove));
            if (ipToRemove === currentIp) {
                sessionStorage.setItem("is_ip_ignored", "false");
            }
        } catch (error) {
            console.error("Błąd usuwania IP:", error);
            alert("Wystąpił błąd podczas usuwania IP.");
        }
    };

    // Aggregate Section Time Data for Chart
    const getAggregatedSectionTime = () => {
        const totals = {};
        let totalTimeAllSections = 0;

        sectionTime.forEach(dayRecord => {
            Object.keys(dayRecord).forEach(key => {
                if (key !== 'date') {
                    totals[key] = (totals[key] || 0) + dayRecord[key];
                    totalTimeAllSections += dayRecord[key];
                }
            });
        });

        const chartData = Object.keys(totals).map(key => ({
            name: SECTION_NAMES[key] || key,
            value: totals[key], // w sekundach
            totalPercentage: totalTimeAllSections > 0 ? ((totals[key] / totalTimeAllSections) * 100).toFixed(1) : 0
        }));

        return chartData.sort((a, b) => b.value - a.value); // Malejąco po czasie
    };

    const sectionChartData = getAggregatedSectionTime();

    const getTotalViews = () => pageViews.reduce((acc, curr) => acc + (curr.count || 0), 0);

    if (loading) {
        return <div className="analytics-loading">Ładowanie danych analitycznych...</div>;
    }

    return (
        <div className="analytics-view">
            <div className="analytics-overview-cards">
                <div className="stat-card">
                    <div className="stat-icon"><Users size={24} /></div>
                    <div className="stat-info">
                        <p>Odsłony łącznie (ostatnie {pageViews.length} dni)</p>
                        <h3>{getTotalViews()}</h3>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon"><Clock size={24} /></div>
                    <div className="stat-info">
                        <p>Najdłużej oglądana sekcja</p>
                        <h3 className="small-text">{sectionChartData[0]?.name || 'Brak danych'}</h3>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon"><Activity size={24} /></div>
                    <div className="stat-info">
                        <p>Odsłony dzisiaj ({pageViews.length > 0 ? pageViews[pageViews.length - 1].date : 'Brak danych'})</p>
                        <h3>{pageViews.length > 0 ? pageViews[pageViews.length - 1].count : 0}</h3>
                    </div>
                </div>
            </div>

            <div className="charts-grid">
                <div className="chart-container full-width">
                    <h3><Calendar size={18} /> Wizyty na stronie w ostatnich dniach</h3>
                    <p className="chart-desc">Liczba unikalnych odsłon sesyjnych z podziałem na dni z ostatnich 30 dni wejść.</p>
                    <div className="chart-wrapper line-chart-wrapper">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={pageViews} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                <XAxis dataKey="date" stroke="#64748B" fontSize={12} tickMargin={10} />
                                <YAxis stroke="#64748B" fontSize={12} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                                    labelStyle={{ fontWeight: 'bold', color: '#1E293B' }}
                                />
                                <Area type="monotone" dataKey="count" stroke="#10b981" fill="#10b981" fillOpacity={0.1} />
                                <Line type="monotone" dataKey="count" name="Odsłony" stroke="#10b981" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="chart-container half-width">
                    <h3><Clock size={18} /> Czas spędzony na sekcjach (łączny czas)</h3>
                    <p className="chart-desc">W których częściach witryny użytkownicy zatrzymują się na dłużej?</p>

                    <div className="chart-wrapper bar-chart-wrapper">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={sectionChartData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#E2E8F0" />
                                <XAxis type="number" hide />
                                <YAxis dataKey="name" type="category" width={150} tick={{ fontSize: 12, fill: '#475569' }} axisLine={false} tickLine={false} />
                                <Tooltip
                                    formatter={(value) => [`${Math.round(value / 60)} min ${value % 60} sek`, 'Czas']}
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                                />
                                <Bar dataKey="value" name="Czas (s)" radius={[0, 4, 4, 0]} barSize={24}>
                                    {sectionChartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="chart-container half-width">
                    <h3>Podział zaangażowania (%)</h3>
                    <div className="chart-wrapper pie-chart-wrapper">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={sectionChartData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    paddingAngle={2}
                                    dataKey="value"
                                >
                                    {sectionChartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    formatter={(value) => [`${Math.round(value / 60)} min`, 'Łącznie']}
                                />
                                <Legend layout="horizontal" verticalAlign="bottom" align="center" wrapperStyle={{ fontSize: '12px' }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

            </div>

            <div className="ip-filtering-section-wrapper">
                <h3><Shield size={18} /> Filtrowanie ruchu (Wykluczenia IP)</h3>
                <p className="section-desc">Ruch z poniższych adresów IP nie będzie wliczany do statystyk analitycznych.</p>

                <div className="ip-controls">
                    <div className="ip-box current-ip-box">
                        <p className="ip-box-title">Twój obecny adres IP:</p>
                        <strong className="ip-value">{currentIp || "Ładowanie..."}</strong>
                        {currentIp && !ignoredIps.includes(currentIp) && (
                            <button onClick={() => handleAddIp(currentIp)} className="btn-add-ip">
                                Wyklucz mój IP
                            </button>
                        )}
                        {currentIp && ignoredIps.includes(currentIp) && (
                            <div className="ip-status-badge">Odporny na śledzenie</div>
                        )}
                    </div>

                    <div className="ip-box manual-ip-box">
                        <p className="ip-box-title">Dodaj inny adres IP:</p>
                        <div className="ip-input-group">
                            <input
                                type="text"
                                placeholder="Np. 192.168.1.1"
                                value={newIp}
                                onChange={(e) => setNewIp(e.target.value)}
                            />
                            <button onClick={() => handleAddIp(newIp)} disabled={!newIp.trim()}>
                                <Plus size={16} /> Dodaj
                            </button>
                        </div>
                    </div>
                </div>

                <div className="ignored-ips-list">
                    <h4>Zignorowane adresy ({ignoredIps.length})</h4>
                    {ignoredIps.length === 0 ? (
                        <p className="empty-text">Brak wykluczonych adresów IP.</p>
                    ) : (
                        <ul>
                            {ignoredIps.map(ip => (
                                <li key={ip}>
                                    <span>{ip} {ip === currentIp && <span className="current-tag">(Twój IP)</span>}</span>
                                    <button onClick={() => handleRemoveIp(ip)} title="Usuń wykluczenie" className="btn-remove">
                                        <Trash2 size={16} />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}

