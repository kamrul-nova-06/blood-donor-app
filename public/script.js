// script.js
import { db } from './firebase.js';
import { collection, addDoc, query, where, getDocs, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const form = document.getElementById('donorForm');
const donorList = document.getElementById('donorList');

// Submit Form
form?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form));
  try {
    await addDoc(collection(db, 'donors'), {
      ...data,
      created: serverTimestamp(),
      approved: false
    });
    alert('✅ Submitted successfully! Wait for approval.');
    form.reset();
  } catch (err) {
    alert('❌ Submission failed');
    console.error(err);
  }
});

// Load Approved Donors
async function loadDonors() {
  const q = query(collection(db, 'donors'), where('approved', '==', true));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    const d = doc.data();
    const card = document.createElement('div');
    card.className = "bg-white p-4 rounded shadow space-y-1 border-l-4 border-red-600";
    card.innerHTML = `
      <h3 class="text-lg font-bold text-red-600">${d.name} (${d.blood})</h3>
      <p>📍 ${d.location || 'Unknown'}</p>
      <p>📞 <a href="tel:${d.phone}" class="text-blue-600 underline">${d.phone}</a></p>
      <p class="text-sm text-gray-600">${d.note || ''}</p>
    `;
    donorList.appendChild(card);
  });
}

if (donorList) loadDonors();
