"use client";

import {
  Building2,
  CheckCircle2,
  Clock,
  ExternalLink,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Save,
  Search,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useAdminStore, type AdminRfq } from "@/lib/admin-store";

function formatWaNumber(phone: string): string {
  let digits = phone.replace(/[^0-9]/g, "");
  if (digits.startsWith("0")) digits = "62" + digits.slice(1);
  if (!digits.startsWith("62")) digits = "62" + digits;
  return digits;
}

export default function AdminContactPage() {
  const { store, mounted, updateCompany, updateRfqStatus, deleteRfq } = useAdminStore();
  const [activeTab, setActiveTab] = useState<"rfqs" | "company">("rfqs");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [rfqSearch, setRfqSearch] = useState("");
  const [companyForm, setCompanyForm] = useState(store.company);
  const [selectedRfq, setSelectedRfq] = useState<AdminRfq | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  if (!mounted) {
    return <div className="p-8 text-sm text-slate-500">Memuat data kontak & RFQ…</div>;
  }

  function showNotice(msg: string) {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  }

  function handleSaveCompany() {
    updateCompany(companyForm);
    showNotice("Informasi kontak resmi perusahaan berhasil diperbarui!");
  }

  const filteredRfqs = store.rfqs.filter((rfq) => {
    const matchStatus = statusFilter === "all" || rfq.status === statusFilter;
    const q = rfqSearch.toLowerCase().trim();
    const matchSearch =
      !q ||
      rfq.requesterName.toLowerCase().includes(q) ||
      rfq.companyName.toLowerCase().includes(q) ||
      rfq.items.toLowerCase().includes(q) ||
      rfq.category.toLowerCase().includes(q);
    return matchStatus && matchSearch;
  });

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-950 dark:text-white">
            Manajemen Kontak & Permintaan Penawaran (RFQ)
          </h2>
          <p className="text-xs text-slate-500">
            Tinjau pesan penawaran harga masuk dari pelanggan dan perbarui informasi kontak operasional kantor.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {notification && (
            <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1.5 text-xs font-bold text-emerald-600">
              <CheckCircle2 className="size-4" /> {notification}
            </span>
          )}
          <Link href="/contact" target="_blank" className="button-secondary text-xs inline-flex items-center gap-1">
            Lihat Halaman Kontak <ExternalLink className="size-3.5" />
          </Link>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-200 pb-2 dark:border-slate-800">
        <button
          type="button"
          onClick={() => setActiveTab("rfqs")}
          className={`rounded-xl px-4 py-2 text-xs font-bold transition ${
            activeTab === "rfqs"
              ? "bg-cyan-600 text-white shadow-sm dark:bg-cyan-500 dark:text-slate-950"
              : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
          }`}
        >
          Inbox Permintaan RFQ ({store.rfqs.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("company")}
          className={`rounded-xl px-4 py-2 text-xs font-bold transition ${
            activeTab === "company"
              ? "bg-cyan-600 text-white shadow-sm dark:bg-cyan-500 dark:text-slate-950"
              : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
          }`}
        >
          Informasi Kontak Resmi Perusahaan
        </button>
      </div>

      {/* Tab 1: RFQ Inbox */}
      {activeTab === "rfqs" && (
        <div className="space-y-4">
          {/* Search & Filter */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={rfqSearch}
                onChange={(e) => setRfqSearch(e.target.value)}
                placeholder="Cari PIC, perusahaan, atau item…"
                className="w-full rounded-2xl border border-slate-200 bg-white py-2 pr-4 pl-10 text-xs outline-none focus:border-cyan-500 dark:border-slate-800 dark:bg-[#0b1628]"
              />
            </div>

            <div className="flex flex-wrap gap-1.5">
              {[
                { id: "all", label: "Semua Status" },
                { id: "new", label: "Baru" },
                { id: "reviewing", label: "Ditinjau" },
                { id: "quoted", label: "Penawaran Terkirim" },
                { id: "closed", label: "Selesai" },
              ].map((st) => (
                <button
                  key={st.id}
                  type="button"
                  onClick={() => setStatusFilter(st.id)}
                  className={`rounded-lg px-2.5 py-1.5 text-[11px] font-bold transition ${
                    statusFilter === st.id
                      ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                      : "bg-white text-slate-600 hover:bg-slate-100 dark:bg-[#0b1628] dark:text-slate-300"
                  }`}
                >
                  {st.label}
                </button>
              ))}
              {store.rfqs.some((r) => r.status === "closed") && (
                <button
                  type="button"
                  onClick={() => {
                    const closed = store.rfqs.filter((r) => r.status === "closed");
                    if (confirm(`Hapus seluruh ${closed.length} permintaan RFQ yang berstatus Selesai?`)) {
                      closed.forEach((r) => deleteRfq(r.id));
                      showNotice(`${closed.length} permintaan RFQ berstatus Selesai berhasil dibersihkan.`);
                    }
                  }}
                  className="inline-flex items-center gap-1 rounded-lg border border-rose-200 bg-rose-50 px-2.5 py-1.5 text-[11px] font-bold text-rose-600 transition hover:bg-rose-100 dark:border-rose-900/40 dark:bg-rose-950/30 dark:text-rose-400"
                >
                  <Trash2 className="size-3" /> Bersihkan Selesai ({store.rfqs.filter((r) => r.status === "closed").length})
                </button>
              )}
            </div>
          </div>

          {/* Table */}
          <div className="surface-card overflow-hidden !p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-slate-200 bg-slate-50 text-slate-500 uppercase dark:border-slate-800 dark:bg-slate-900/50">
                  <tr>
                    <th className="p-4 font-bold">Waktu & PIC</th>
                    <th className="p-4 font-bold">Perusahaan / Site</th>
                    <th className="p-4 font-bold">Kategori</th>
                    <th className="p-4 font-bold">Kebutuhan Item</th>
                    <th className="p-4 font-bold">Status</th>
                    <th className="p-4 font-bold text-right">Tindakan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {filteredRfqs.map((rfq) => {
                    const statusColors = {
                      new: "bg-blue-500/10 text-blue-600 border-blue-200 dark:border-blue-800",
                      reviewing: "bg-amber-500/10 text-amber-600 border-amber-200 dark:border-amber-800",
                      quoted: "bg-emerald-500/10 text-emerald-600 border-emerald-200 dark:border-emerald-800",
                      closed: "bg-slate-200 text-slate-600 border-slate-300 dark:border-slate-700",
                    };

                    return (
                      <tr key={rfq.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                        <td className="p-4">
                          <p className="font-bold text-slate-900 dark:text-white">{rfq.requesterName}</p>
                          <p className="text-[10px] text-slate-400">
                            {new Date(rfq.createdAt).toLocaleDateString("id-ID", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </p>
                        </td>
                        <td className="p-4 font-medium text-slate-700 dark:text-slate-300">
                          {rfq.companyName}
                        </td>
                        <td className="p-4 font-semibold text-cyan-600 dark:text-cyan-400">
                          {rfq.category}
                        </td>
                        <td className="p-4 max-w-xs truncate text-slate-600 dark:text-slate-400">
                          {rfq.items}
                        </td>
                        <td className="p-4">
                          <select
                            value={rfq.status}
                            onChange={(e) =>
                              updateRfqStatus(rfq.id, e.target.value as typeof rfq.status)
                            }
                            className={`rounded-lg border px-2 py-1 text-[11px] font-bold outline-none cursor-pointer ${statusColors[rfq.status]}`}
                          >
                            <option value="new">Baru</option>
                            <option value="reviewing">Sedang Ditinjau</option>
                            <option value="quoted">Penawaran Terkirim</option>
                            <option value="closed">Selesai</option>
                          </select>
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              type="button"
                              onClick={() => setSelectedRfq(rfq)}
                              className="rounded-lg bg-slate-100 px-2 py-1 text-[11px] font-bold text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
                            >
                              Detail
                            </button>
                            <a
                              href={`https://wa.me/${formatWaNumber(rfq.phone)}?text=${encodeURIComponent(
                                `Halo Bapak/Ibu ${rfq.requesterName} (${rfq.companyName}), kami dari CV Agape Sinar Nirwana ingin menindaklanjuti permintaan penawaran harga Anda mengenai "${rfq.items}". Apakah ada spesifikasi detail yang dapat kami bantu?`
                              )}`}
                              target="_blank"
                              rel="noreferrer"
                              title="Follow-up via WhatsApp"
                              className="rounded-lg bg-emerald-600 px-2 py-1 text-[11px] font-bold text-white hover:bg-emerald-700"
                            >
                              WA
                            </a>
                            {rfq.email && rfq.email !== "-" && (
                              <a
                                href={`mailto:${rfq.email}?subject=${encodeURIComponent(
                                  `Tindak Lanjut Penawaran Harga ASN — ${rfq.companyName}`
                                )}&body=${encodeURIComponent(
                                  `Halo Bapak/Ibu ${rfq.requesterName},\n\nTerima kasih atas kepercayaan Anda kepada CV Agape Sinar Nirwana.\n\nMenindaklanjuti permohonan penawaran harga Anda untuk kategori ${rfq.category} (${rfq.items}), kami siap membantu pengadaan dan surat penawaran resmi.\n\nSalam hormat,\nTim Sales CV Agape Sinar Nirwana`
                                )}`}
                                title="Follow-up via Email"
                                className="rounded-lg bg-slate-100 px-2 py-1 text-[11px] font-bold text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
                              >
                                Email
                              </a>
                            )}
                            <button
                              type="button"
                              onClick={() => {
                                if (confirm(`Hapus permintaan RFQ dari ${rfq.requesterName} (${rfq.companyName})?`)) {
                                  deleteRfq(rfq.id);
                                  showNotice("Permintaan RFQ berhasil dihapus.");
                                }
                              }}
                              title="Hapus RFQ"
                              className="rounded-lg p-1 text-slate-400 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/40"
                            >
                              <Trash2 className="size-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {filteredRfqs.length === 0 && (
              <div className="p-8 text-center text-xs text-slate-500">
                Tidak ada permintaan RFQ yang cocok dengan filter.
              </div>
            )}
          </div>

          {/* RFQ Detail Modal */}
          {selectedRfq && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">
              <div className="surface-card w-full max-w-lg space-y-4 p-6 shadow-2xl">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3 dark:border-slate-800">
                  <h3 className="text-base font-bold text-slate-950 dark:text-white">
                    Rincian RFQ: {selectedRfq.companyName}
                  </h3>
                  <button
                    type="button"
                    onClick={() => setSelectedRfq(null)}
                    className="text-xs font-bold text-slate-400 hover:text-slate-600"
                  >
                    Tutup
                  </button>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <span className="font-bold text-slate-500">Nama PIC:</span>
                    <p className="font-bold text-slate-900 dark:text-white">{selectedRfq.requesterName}</p>
                  </div>
                  <div>
                    <span className="font-bold text-slate-500">Perusahaan / Site:</span>
                    <p className="text-slate-800 dark:text-slate-200">{selectedRfq.companyName}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="font-bold text-slate-500">WhatsApp / Telepon:</span>
                      <p className="font-mono font-bold text-cyan-600">{selectedRfq.phone}</p>
                    </div>
                    <div>
                      <span className="font-bold text-slate-500">Email:</span>
                      <p className="font-mono text-slate-800 dark:text-slate-200">{selectedRfq.email}</p>
                    </div>
                  </div>
                  <div>
                    <span className="font-bold text-slate-500">Kategori:</span>
                    <p className="font-bold text-slate-800 dark:text-slate-200">{selectedRfq.category}</p>
                  </div>
                  <div>
                    <span className="font-bold text-slate-500">Kebutuhan Item & Spesifikasi:</span>
                    <div className="mt-1 rounded-xl bg-slate-50 p-3 leading-relaxed text-slate-800 dark:bg-slate-900/60 dark:text-slate-200 whitespace-pre-line border border-slate-200 dark:border-slate-800">
                      {selectedRfq.items}
                    </div>
                  </div>
                  <div>
                    <span className="font-bold text-slate-500">Catatan Internal Tim:</span>
                    <textarea
                      rows={2}
                      value={selectedRfq.notes || ""}
                      onChange={(e) => {
                        const updated = { ...selectedRfq, notes: e.target.value };
                        setSelectedRfq(updated);
                        updateRfqStatus(selectedRfq.id, selectedRfq.status, e.target.value);
                      }}
                      placeholder="Tuliskan catatan tindak lanjut internal..."
                      className="mt-1 w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs outline-none dark:border-slate-700 dark:bg-slate-800"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2 pt-3 border-t border-slate-200 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] text-slate-400">
                      Masuk: {new Date(selectedRfq.createdAt).toLocaleString("id-ID")}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm(`Hapus permintaan RFQ dari ${selectedRfq.requesterName} (${selectedRfq.companyName})?`)) {
                          deleteRfq(selectedRfq.id);
                          setSelectedRfq(null);
                          showNotice("Permintaan RFQ berhasil dihapus.");
                        }
                      }}
                      className="text-[11px] font-bold text-rose-600 hover:text-rose-700 dark:text-rose-400 inline-flex items-center gap-1"
                    >
                      <Trash2 className="size-3" /> Hapus
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      href={`mailto:${selectedRfq.email}?subject=Penawaran Harga ASN — ${encodeURIComponent(
                        selectedRfq.companyName
                      )}`}
                      className="button-secondary text-xs inline-flex items-center gap-1"
                    >
                      <Mail className="size-3.5" /> Balas Email
                    </a>
                    <a
                      href={`https://wa.me/${selectedRfq.phone.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noreferrer"
                      className="button-primary text-xs inline-flex items-center gap-1 !bg-emerald-600 hover:!bg-emerald-700"
                    >
                      <MessageCircle className="size-3.5" /> Chat WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Company Contact Info */}
      {activeTab === "company" && (
        <div className="surface-card space-y-6 p-6 sm:p-8">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4 dark:border-slate-800">
            <div>
              <h3 className="text-base font-bold text-slate-950 dark:text-white">
                Kontak & Alamat Operasional Kantor
              </h3>
              <p className="text-xs text-slate-500">
                Informasi ini ditampilkan pada header, footer, dan halaman kontak website.
              </p>
            </div>
            <button
              type="button"
              onClick={handleSaveCompany}
              className="button-primary text-xs inline-flex items-center gap-1.5"
            >
              <Save className="size-4" /> Simpan Kontak
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Nama Perusahaan Resmi (Legal)
              </label>
              <input
                type="text"
                value={companyForm.legalName}
                onChange={(e) => setCompanyForm({ ...companyForm, legalName: e.target.value })}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs outline-none focus:border-cyan-500 dark:border-slate-700 dark:bg-slate-800"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Nama Singkatan (Brand)
              </label>
              <input
                type="text"
                value={companyForm.shortName}
                onChange={(e) => setCompanyForm({ ...companyForm, shortName: e.target.value })}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs outline-none focus:border-cyan-500 dark:border-slate-700 dark:bg-slate-800"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Nomor Telepon / WhatsApp (Format Tampilan)
              </label>
              <input
                type="text"
                value={companyForm.phoneDisplay}
                onChange={(e) => setCompanyForm({ ...companyForm, phoneDisplay: e.target.value })}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs outline-none focus:border-cyan-500 dark:border-slate-700 dark:bg-slate-800"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Nomor WhatsApp Internasional (Angka saja: 628...)
              </label>
              <input
                type="text"
                value={companyForm.phoneInternational}
                onChange={(e) =>
                  setCompanyForm({ ...companyForm, phoneInternational: e.target.value })
                }
                className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs outline-none focus:border-cyan-500 dark:border-slate-700 dark:bg-slate-800"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Email Resmi Perusahaan
              </label>
              <input
                type="email"
                value={companyForm.email}
                onChange={(e) => setCompanyForm({ ...companyForm, email: e.target.value })}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs outline-none focus:border-cyan-500 dark:border-slate-700 dark:bg-slate-800"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Jam Operasional
              </label>
              <input
                type="text"
                value={companyForm.businessHours}
                onChange={(e) => setCompanyForm({ ...companyForm, businessHours: e.target.value })}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs outline-none focus:border-cyan-500 dark:border-slate-700 dark:bg-slate-800"
              />
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Alamat Kantor Operasional
            </h4>
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300">
                  Jalan / Kompleks Perumahan
                </label>
                <input
                  type="text"
                  value={companyForm.addressStreet}
                  onChange={(e) =>
                    setCompanyForm({ ...companyForm, addressStreet: e.target.value })
                  }
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs outline-none focus:border-cyan-500 dark:border-slate-700 dark:bg-slate-800"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300">
                  RT / Kelurahan / Kecamatan
                </label>
                <input
                  type="text"
                  value={companyForm.addressSubdistrict}
                  onChange={(e) =>
                    setCompanyForm({ ...companyForm, addressSubdistrict: e.target.value })
                  }
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs outline-none focus:border-cyan-500 dark:border-slate-700 dark:bg-slate-800"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300">
                  Kota & Provinsi
                </label>
                <input
                  type="text"
                  value={companyForm.addressCity}
                  onChange={(e) => setCompanyForm({ ...companyForm, addressCity: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs outline-none focus:border-cyan-500 dark:border-slate-700 dark:bg-slate-800"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
