const elUserList = document.querySelector(".userList");
const elUserListTemp = document.querySelector(".userList__template").content;
const elPostList = document.querySelector(".postList");
const elPostListTemp = document.querySelector(".postList__template").content;
const elCommentList = document.querySelector(".commentList");
const elCommentListTemp = document.querySelector(".commentList__template").content;



elUserList.addEventListener("click", function(evt) {
  if(evt.target.matches(".userList__name")) {
    let userItemId = evt.target.dataset.userId;
    async function getPost() {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userItemId}`);
    
      const data = await response.json();
      elPostList.classList.add("open");
      renderPost(data, elPostList)
    }
    getPost();
  }
})

elPostList.addEventListener("click", function(evt) {
  if(evt.target.matches(".postList__title")) {
    let postItemId = evt.target.dataset.postId;
    async function getComment() {
      const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postItemId}`);
    
      const data = await response.json();
      elCommentList.classList.add("open");
      renderComment(data, elCommentList)
    }
    
    getComment();

  }
})

// ================================================= User List ====================================================

const UserFragment = document.createDocumentFragment();

const renderUser = (array, node) => {
  array.forEach(e => {
    node.innerHTML = "";    
    const newTemplate = elUserListTemp.cloneNode(true)

    newTemplate.querySelector(".userList__username").textContent = e.username;
    newTemplate.querySelector(".userList__name").textContent = e.name;
    newTemplate.querySelector(".userList__id").textContent = e.id;
    newTemplate.querySelector(".userList__street").textContent = e.address.street;
    newTemplate.querySelector(".userList__suite").textContent = e.address.suite;
    newTemplate.querySelector(".userList__city").textContent = e.address.city;
    newTemplate.querySelector(".userList__zipcode").textContent = e.address.zipcode;
    newTemplate.querySelector(".userList__companyName").textContent = e.company.name;
    newTemplate.querySelector(".userList__companyCatchPhrase").textContent = e.company.catchPhrase;
    newTemplate.querySelector(".userList__companyBs").textContent = e.company.bs;
    newTemplate.querySelector(".userList__phoneNumber").textContent = e.phone;
    newTemplate.querySelector(".userList__emailText").textContent = e.email;

    newTemplate.querySelector(".userList__phone").href = `tel:${e.phone}`;
    newTemplate.querySelector(".userList__location").href = `https://www.google.com/maps/place/${e.address.geo.lat},${e.address.geo.lng}`;
    newTemplate.querySelector(".userList__website").href = `http://${e.website}`;
    newTemplate.querySelector(".userList__emailText").href = `mailto:${e.email}`;
    

    newTemplate.querySelector(".userList__name").dataset.userId = e.id;

    
    UserFragment.appendChild(newTemplate)
  })
  node.appendChild(UserFragment);
}

async function getUser() {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users`);

  const data = await response.json();
  renderUser(data, elUserList)
}

getUser();

// ================================================ Post List ==========================================================================

const postFragment = document.createDocumentFragment();

const renderPost = (array, node) => {
  array.forEach(e => {
    node.innerHTML = "";    
    const newTemplate = elPostListTemp.cloneNode(true)

    newTemplate.querySelector(".postList__title").textContent = e.title;
    newTemplate.querySelector(".postList__text").textContent = e.body;

    newTemplate.querySelector(".postList__title").dataset.postId = e.id;
    
    postFragment.appendChild(newTemplate)
  })
  node.appendChild(postFragment);
}

// =============================================== Comment List ======================================================================

const commentFragment = document.createDocumentFragment();

const renderComment = (array, node) => {
  array.forEach(e => {
    node.innerHTML = "";    
    const newTemplate = elCommentListTemp.cloneNode(true)

    newTemplate.querySelector(".commentList__title").textContent = e.name;
    newTemplate.querySelector(".commentList__emailText").textContent = e.email;
    newTemplate.querySelector(".commentList__text").textContent = e.body;

    newTemplate.querySelector(".commentList__email").href = `mailto:${e.email}`;
    
    commentFragment.appendChild(newTemplate)
  })
  node.appendChild(commentFragment);
}

