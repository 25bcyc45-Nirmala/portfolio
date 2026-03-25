// Typing effect for landing section
const text = "Hello, I'm Nirmala Kumari R | Securing Digital Systems...";
let i = 0;

function typingEffect() {
  if (i < text.length) {
    document.getElementById("typing").innerHTML += text.charAt(i);
    i++;
    setTimeout(typingEffect, 50);
  }
}
typingEffect();

// Scroll animation for cards
const cards = document.querySelectorAll(".card");

window.addEventListener("scroll", () => {
  cards.forEach(card => {
    const top = card.getBoundingClientRect().top;
    if (top < window.innerHeight - 50) {
      card.style.opacity = 1;
      card.style.transform = "translateY(0)";
    }
  });
});

// Contact form submission
document.getElementById("contact-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    message: document.getElementById("message").value
  };

  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const result = await res.json();

    if (result.success) {
      alert("✅ Message Sent Successfully!");
      document.getElementById("contact-form").reset();
    } else {
      alert("❌ Failed to send. Check backend or policy.");
    }
  } catch (err) {
    alert("⚠️ Unable to reach backend at API_BASE_URL");
    console.error(err);
  }
});
