"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

interface Contact {
  id: string;
  name: string;
  where_met: string | null;
  notes: string | null;
  last_pinged: string;
}

function getDaysSince(date: string): number {
  const pinged = new Date(date);
  const now = new Date();
  const diff = now.getTime() - pinged.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

function formatRelativeTime(date: string): string {
  const days = getDaysSince(date);
  if (days === 0) return "today";
  if (days === 1) return "yesterday";
  return `${days} days ago`;
}

export default function ContactDetailPage() {
  const params = useParams();
  const contactId = params.id as string;
  
  const [contact, setContact] = useState<Contact | null>(null);
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState("");
  const [savingNotes, setSavingNotes] = useState(false);
  const [pinging, setPinging] = useState(false);

  const supabase = createClient();

  useEffect(() => {
    if (contactId) {
      fetchContact();
    }
  }, [contactId]);

  async function fetchContact() {
    const { data, error } = await supabase
      .from("contacts")
      .select("*")
      .eq("id", contactId)
      .single();

    if (!error && data) {
      setContact(data);
      setNotes(data.notes || "");
    }
    setLoading(false);
  }

  async function handlePinged() {
    if (!contact) return;
    
    setPinging(true);
    const now = new Date().toISOString();
    
    // Optimistic update
    setContact({ ...contact, last_pinged: now });

    // Server update
    await supabase
      .from("contacts")
      .update({ last_pinged: now })
      .eq("id", contactId);
    
    setPinging(false);
  }

  async function handleSaveNotes() {
    if (!contact) return;
    
    setSavingNotes(true);
    
    await supabase
      .from("contacts")
      .update({ notes })
      .eq("id", contactId);
    
    setContact({ ...contact, notes });
    setSavingNotes(false);
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  if (!contact) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Contact not found</p>
          <Link href="/dashboard" className="text-[#7C3AED] hover:underline">
            Back to dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Top Bar */}
      <header className="border-b border-gray-200 px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <Link href="/dashboard" className="text-sm text-gray-600 hover:text-gray-900">
            ← Back to dashboard
          </Link>
          <Link href="/" className="text-xl font-bold text-[#7C3AED]">Ping</Link>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2">{contact.name}</h1>
            
            {contact.where_met && (
              <p className="text-gray-600 mb-1">{contact.where_met}</p>
            )}
            
            <p className="text-sm text-gray-500">
              Last pinged: {formatRelativeTime(contact.last_pinged)}
            </p>
          </div>

          {/* Pinged Button */}
          <button
            onClick={handlePinged}
            disabled={pinging}
            className="w-full py-2.5 bg-[#7C3AED] text-white font-medium rounded-lg hover:bg-[#6D28D9] transition-colors disabled:opacity-50 mb-6"
          >
            {pinging ? "Updating..." : "Pinged"}
          </button>

          {/* Notes Section */}
          <div>
            <label className="block text-sm font-medium mb-2">Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7C3AED] h-32 resize-none mb-3"
              placeholder="Add notes about this contact..."
            />
            <button
              onClick={handleSaveNotes}
              disabled={savingNotes}
              className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
            >
              {savingNotes ? "Saving..." : "Save Notes"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
