import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const SUPABASE_URL = 'https://<YOUR-PROJECT-ID>.supabase.co';
const SUPABASE_ANON_KEY = '<YOUR-ANON-KEY>';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const text = "Hello, I'm Nirmala Kumari R | Securing Digital Systems...";
let i = 0;

function typingEffect() {
  if (i < text.length) {
    document.getElementById('typing').innerHTML += text.charAt(i);
    i++;
    setTimeout(typingEffect, 50);
  }
}
typingEffect();

const cards = document.querySelectorAll('.card');
window.addEventListener('scroll', () => {
  cards.forEach(card => {
    const top = card.getBoundingClientRect().top;
    if (top < window.innerHeight - 50) {
      card.style.opacity = 1;
      card.style.transform = 'translateY(0)';
    }
  });
});

const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const letters = '01';
const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

function drawMatrix() {
  ctx.fillStyle = 'rgba(0,0,0,0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#00ffcc';
  ctx.font = fontSize + 'px monospace';

  for (let j = 0; j < drops.length; j++) {
    const char = letters[Math.floor(Math.random() * letters.length)];
    ctx.fillText(char, j * fontSize, drops[j] * fontSize);
    if (drops[j] * fontSize > canvas.height || Math.random() > 0.95) {
      drops[j] = 0;
    }
    drops[j]++;
  }
}

setInterval(drawMatrix, 33);

async function loadMessages() {
  const { data, error } = await supabase
    .from('messages')
    .select('name, email, message, created_at')
    .order('created_at', { ascending: false })
    .limit(10);

  const list = document.getElementById('messages');
  list.innerHTML = '';

  if (error) {
    console.error('Could not load messages', error);
    list.innerHTML = '<li>Unable to load messages.</li>';
    return;
  }

  if (!data || data.length === 0) {
    list.innerHTML = '<li>No messages yet.</li>';
    return;
  }

  data.forEach(msg => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${msg.name}</strong> (${msg.email}): ${msg.message}`;
    list.appendChild(li);
  });
}

loadMessages();

document.getElementById('contact-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const messageData = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    message: document.getElementById('message').value
  };

  const { error } = await supabase.from('messages').insert([messageData]);

  if (error) {
    alert('❌ Failed to send. Check Supabase table and RLS policy.');
    console.error(error);
    return;
  }

  alert('✅ Message Sent Successfully!');
  document.getElementById('contact-form').reset();
  await loadMessages();
});
