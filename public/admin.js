// admin.js
import { auth, provider, db, signInWithPopup } from './firebase.js';
import { collection, getDocs, updateDoc, deleteDoc, doc, query, where } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const loginBtn = document.getElementById('loginBtn');
const adminArea = document.getElementById('adminArea');
const pendingList = document.getElementById('pendingList');

// Define allowed admin emails
const allowedAdmins = ["kamrulislam2007s@gmail.com"];

// Login handler
loginBtn.addEventListener('click', async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    if (!allowedAdmins.includes(user.email)) {
      alert('❌ You are not authorized admin');
      await signOut(auth);
      return;
    }
    loginBtn.style.display = 'none';
    adminArea.classList.remove('hidden');
    loadPendingDonors();
  } catch (error) {
    alert('Login failed');
    console.error(error);
  }
});

// Load pending donors
async function loadPendingDonors() {
  pendingList.innerHTML = '';
  const q = query(collection(db, 'donors'), where('approved', '==', false));
  const snapshot = await getDocs(q);
  snapshot.forEach(docSnap => {
    const d = docSnap.data();
    const docId = docSnap.id;
    const card = document.createElement('div');
    card.className = "bg-white p-4 rounded shadow space-y-1 border-l-4 border-yellow-500";
    card.innerHTML = `
      <h3 class="font-bold text-yellow-600">${d.name} (${d.blood})</h3>
      <p>📍 ${d.location || 'Unknown'}</p>
      <p>📞 ${d.phone}</p>
      <p class="text-sm text-gray-600">${d.note || ''}</p>
      <div class="flex gap-2 mt-2">
        <button class="approveBtn bg-green-600 text-white px-3 py-1 rounded" data-id="${docId}">Approve</button>
        <button class="deleteBtn bg-red-600 text-white px-3 py-1 rounded" data-id="${docId}">Delete</button>
      </div>
    `;
    pendingList.appendChild(card);
  });
  // Add button listeners
  document.querySelectorAll('.approveBtn').forEach(btn => {
    btn.addEventListener('click', async e => {
      const id = e.target.dataset.id;
      await updateDoc(doc(db, 'donors', id), { approved: true });
      loadPendingDonors();
    });
  });
  document.querySelectorAll('.deleteBtn').forEach(btn => {
    btn.addEventListener('click', async e => {
      const id = e.target.dataset.id;
      await deleteDoc(doc(db, 'donors', id));
      loadPendingDonors();
    });
  });
}

// Auth state observer
onAuthStateChanged(auth, user => {
  if (!user) {
    loginBtn.style.display = 'inline-block';
    adminArea.classList.add('hidden');
  }
});
