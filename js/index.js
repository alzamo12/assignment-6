 const loadAllPosts = async (searchText) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchText}`);
    const data = await res.json();
    console.log(data)
    const posts = data.posts;
    console.log(posts)
    showDevice(posts)
}

const showDevice = (posts) => {
    const postContainer = document.getElementById('post-container');

    posts.forEach(post  => {
        const postCard = document.createElement('div');
        postCard.classList = 'lg:flex lg:px-5 py-10 space-x-10 border-2 border-black bg-gray-100 rounded-3xl';
        postCard.innerHTML = `
            <div>
                    <img src="${post.image}" class="w-20 h-20" alt="">
                  </div>
                  <div>
                    <p><span>#${post?.category}</span> &nbsp; <span>Author: ${post?.author?.name}</span> </p>
                    <h3>${post?.title}</h3>
                    <p>${post?.description}</p>
                    <hr>
                    <p>
                      <span>${post.comment_count}</span> &nbsp;
                      <span>${post.view_count}</span> &nbsp;
                      <span>${post.posted_time}</span> &nbsp;
                    </p>
                  </div>
        `
        postContainer.appendChild(postCard)
    });
}

const inputField = () => {
    const inputField = document.getElementById('input-field');
    const searchText = inputField.value;
    loadAllPosts(searchText)
}

// loadAllPosts()
