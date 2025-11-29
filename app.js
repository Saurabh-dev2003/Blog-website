
// Select nav items
const navItems = document.querySelectorAll("#mainNav ul li");

// Select main content sections
const homeSection = document.getElementById("home");
const postsSection = document.getElementById("postsList");

// Click event for each nav item
navItems.forEach((item, index) => {

    item.addEventListener("click", () => {

        // Home
        if (index === 0) {
            window.location.href = "index.html";
        }

        // Post 1
        if (index === 1) {
            window.location.href = "post-1.html";
        }

        // Post 2
        if (index === 2) {
            window.location.href = "post-2.html";
        }

        // Post 3
        if (index === 3) {
            window.location.href = "post-3.html";
        }

    });

});


// Mobile menu toggle
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    mainNav.classList.toggle("show");

  });
}

// Auto-update footer year
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}


/* ------------------------------------------
   HOMEPAGE SEARCH FILTER (index.html only)
-------------------------------------------*/

const searchInput = document.getElementById("searchInput");
const postCards = document.querySelectorAll(".post-card");

if (searchInput && postCards.length > 0) {
  searchInput.addEventListener("input", () => {
    const value = searchInput.value.toLowerCase();

    postCards.forEach(card => {
      const title = card.querySelector("h3").textContent.toLowerCase();
      const excerpt = card.querySelector(".excerpt").textContent.toLowerCase();

      if (title.includes(value) || excerpt.includes(value)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
}


/* ------------------------------------------
   COMMENT SYSTEM (Post Pages)
-------------------------------------------*/

const commentForm = document.getElementById("commentForm");
const commentsList = document.getElementById("commentsList");

if (commentForm && commentsList) {

  // Get post file name (ex: 'post-2')
  const pageName = window.location.pathname.split("/").pop().replace(".html", "");
  const commentKey = "comments-" + pageName;

  // Load comments when page opens
  loadComments();

  // When user submits comment
  commentForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("commentName").value.trim();
    const message = document.getElementById("commentMessage").value.trim();

    if (!name || !message) return;

    const newComment = {
      name,
      message,
      time: new Date().toLocaleString()
    };

    // Save to localStorage
    const existing = JSON.parse(localStorage.getItem(commentKey)) || [];
    existing.unshift(newComment);
    localStorage.setItem(commentKey, JSON.stringify(existing));

    // Clear form
    commentForm.reset();

    // Update list
    loadComments();
  });

  // Load comments function
  function loadComments() {
    commentsList.innerHTML = "";

    const comments = JSON.parse(localStorage.getItem(commentKey)) || [];

    if (comments.length === 0) {
      commentsList.innerHTML = `<p class="no-comments">No comments yet — be the first to comment!</p>`;
      return;
    }

    comments.forEach(c => {
      const div = document.createElement("div");
      div.className = "comment";
      div.innerHTML = `
        <div class="who">${c.name}</div>
        <div class="when">${c.time}</div>
        <div class="what">${c.message}</div>
      `;
      commentsList.appendChild(div);
    });
  }
}
