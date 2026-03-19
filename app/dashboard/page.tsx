"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

interface Contact {
  id: string;
  name: string;
  where_met: string | null;
  notes: string | null;
  last_pinged: string;
  created_at: string;
}

function getDaysSince(date: string): number {
  const pinged = new Date(date);
  const now = new Date();
  const diff = now.getTime() - pinged.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

function getBorderColor(days: number): string {
  if (days <= 7) return "border-green-500";
  if (days <= 21) return "border-yellow-500";
  return "border-red-500";
}

function formatRelativeTime(date: string): string {
  const days = getDaysSince(date);
  if (days === 0) return "today";
  if (days === 1) return "yesterday";
  return `${days} days ago`;
}

export default function DashboardPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newContact, setNewContact] = useState({ name: "", where_met: "", notes: "" });
  const [adding, setAdding] = useState(false);
  const [user, setUser] = useState<{ email: string } | null>(null);

  const supabase = createClient();

  useEffect(() => {
    fetchContacts();
    fetchUser();
  }, []);

  async function fetchUser() {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      setUser({ email: user.email || "" });
    }
  }

  async function fetchContacts() {
    const { data, error } = await supabase
      .from("contacts")
      .select("*")
      .order("last_pinged", { ascending: true });

    if (!error && data) {
      setContacts(data);
    }
    setLoading(false);
  }

  async function handleAddContact(e: React.FormEvent) {
    e.preventDefault();
    if (!newContact.name.trim()) return;

    setAdding(true);
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) return;

    const { error } = await supabase.from("contacts").insert({
      user_id: user.id,
      name: newContact.name,
      where_met: newContact.where_met || null,
      notes: newContact.notes || null,
      last_pinged: new Date().toISOString(),
    });

    if (!error) {
      setNewContact({ name: "", where_met: "", notes: "" });
      setShowModal(false);
      fetchContacts();
    }
    setAdding(false);
  }

  async function handlePinged(contactId: string) {
    const now = new Date().toISOString();
    
    // Optimistic update
    setContacts(prev =>
      prev.map(c =>
        c.id === contactId ? { ...c, last_pinged: now } : c
      ).sort((a, b) =>
        new Date(a.last_pinged).getTime() - new Date(b.last_pinged).getTime()
      )
    );

    // Server update
    await supabase
      .from("contacts")
      .update({ last_pinged: now })
      .eq("id", contactId);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    window.location.href = "/login";
  }

  const contactsToPing = contacts.slice(0, 3);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Top Bar */}
      <header className="border-b border-gray-200 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-[#7C3AED]">Ping</Link>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowModal(true)}
              className="px-4 py-2 bg-[#7C3AED] text-white text-sm font-medium rounded-lg hover:bg-[#6D28D9] transition-colors"
            >
              + Add Contact
            </button>
            <button
              onClick={handleLogout}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Log out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        {/* People to Ping Today */}
        {contactsToPing.length > 0 && (
          <section className="mb-10">
            <h2 className="text-lg font-semibold mb-4">People to Ping Today</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {contactsToPing.map((contact) => {
                const days = getDaysSince(contact.last_pinged);
                return (
                  <div
                    key={contact.id}
                    className={`bg-white p-4 rounded-lg shadow-sm border-2 ${getBorderColor(days)}`}
                  >
                    <div className="font-medium mb-1">{contact.name}</div>
                    <div className="text-sm text-gray-500 mb-3">
                      Last pinged: {formatRelativeTime(contact.last_pinged)}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handlePinged(contact.id)}
                        className="flex-1 py-1.5 bg-[#7C3AED] text-white text-sm font-medium rounded hover:bg-[#6D28D9] transition-colors"
                      >
                        Pinged
                      </button>
                      <Link
                        href={`/contact/${contact.id}`}
                        className="px-3 py-1.5 border border-gray-300 text-sm font-medium rounded hover:bg-gray-50 transition-colors"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* All Contacts */}
        <section>
          <h2 className="text-lg font-semibold mb-4">All Contacts</h2>
          
          {contacts.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No contacts yet. Add your first contact above!
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {contacts.map((contact) => {
                const days = getDaysSince(contact.last_pinged);
                return (
                  <div
                    key={contact.id}
                    className={`bg-white p-4 rounded-lg shadow-sm border-2 ${getBorderColor(days)}`}
                  >
                    <div className="font-medium mb-1">{contact.name}</div>
                    {contact.where_met && (
                      <div className="text-sm text-gray-500 mb-1">{contact.where_met}</div>
                    )}
                    <div className="text-sm text-gray-500 mb-3">
                      Last pinged: {formatRelativeTime(contact.last_pinged)}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handlePinged(contact.id)}
                        className="flex-1 py-1.5 bg-[#7C3AED] text-white text-sm font-medium rounded hover:bg-[#6D28D9] transition-colors"
                      >
                        Pinged
                      </button>
                      <Link
                        href={`/contact/${contact.id}`}
                        className="px-3 py-1.5 border border-gray-300 text-sm font-medium rounded hover:bg-gray-50 transition-colors"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </main>

      {/* Add Contact Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Add Contact</h2>
            
            <form onSubmit={handleAddContact} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  value={newContact.name}
                  onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Where you met
                </label>
                <input
                  type="text"
                  value={newContact.where_met}
                  onChange={(e) => setNewContact({ ...newContact, where_met: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
                  placeholder="e.g., Conference, Coffee shop"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Notes</label>
                <textarea
                  value={newContact.notes}
                  onChange={(e) => setNewContact({ ...newContact, notes: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7C3AED] h-24 resize-none"
                  placeholder="Any details to remember..."
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-2 border border-gray-300 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={adding || !newContact.name.trim()}
                  className="flex-1 py-2 bg-[#7C3AED] text-white font-medium rounded-lg hover:bg-[#6D28D9] transition-colors disabled:opacity-50"
                >
                  {adding ? "Adding..." : "Add Contact"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
