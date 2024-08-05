 const loadAllPosts = async (searchText) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchText}`);
    const data = await res.json();
    console.log(data)
    const posts = data.posts;
    console.log(posts)
    showDevice(posts)
}

// const showDevice = (posts) => {
//     const postContainer = document.getElementById('post-container');
//     postContainer.textContent = '';

//     posts.forEach(post  => {
//         const postCard = document.createElement('div');
//         postCard.classList = 'lg:flex lg:px-5 py-10 space-x-10 border-2 border-black bg-gray-100 rounded-3xl';
//         postCard.innerHTML = `
//             <div>
//                     <img src="${post.image}" class="w-20 h-20" alt="">
//                   </div>
//                   <div>
//                     <p><span>#${post?.category}</span> &nbsp; <span>Author: ${post?.author?.name}</span> </p>
//                     <h3>${post?.title}</h3>
//                     <p>${post?.description}</p>
//                     <hr>
//                     <div class="flex justify-between">
//                         <p>
//                          <span>${post.comment_count}</span> &nbsp;
//                          <span>${post.view_count}</span> &nbsp;
//                          <span>${post.posted_time}</span> &nbsp;
//                         </p>
//                         <button onclick="clickedPost()" class="rounded-full w-8 h-6 p-1 bg-green-500 text-center"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48L48 64zM0 176L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-208L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"/></svg></button>
//                     </div>
//                   </div>
//         `

       

        
//         postContainer.appendChild(postCard)
//     });
//     document.getElementById('loading-spinner').classList.add('hidden')
//     const clickedPost = () => {
//         const seenPost = document.createElement('div');
//         seenPost.innerHTML = `
//         <h1>${post?.title}</h1>
//         <p>${post?.posted_time}</p>
//         `
//         const seenPostContainer = document.getElementById('seen-post-container');
//         seenPostContainer.appendChild(seenPost)

//     }
// }

const showDevice = (posts) => {
    const postContainer = document.getElementById('post-container');
    postContainer.textContent = '';

    posts.forEach((post) => {
        const postCard = document.createElement('div');
        // ... (your existing code for creating the postCard)
        // const postCard = document.createElement('div');
                 postCard.classList = ' lg:flex lg:px-5 py-10 space-x-10 border-2 border-black bg-gray-100 rounded-3xl flex-1';
                postCard.innerHTML = `
                           <div> 
                          
                                 <div   class="active-status h-5 absolute  w-5 rounded-full bg-red-600  border-2"></div>
   
                           <img src="${post.image}" class="w-20 h-20 rounded-3xl" alt="">
                           </div>
                           <div>
                             <p><span>#${post?.category}</span> &nbsp; <span>Author: ${post?.author?.name}</span> </p>
                             <h3>${post?.title}</h3>
                             <p>${post?.description}</p>
                             <hr>
                             <div class="flex justify-between">
                                 <p>
                                  <span>${post.comment_count}</span> &nbsp;
                                  <span>${post.view_count}</span> &nbsp;
                                  <span>${post.posted_time}</span> &nbsp;
                                 </p>
                             </div>
                           </div>
                 `
                //  isActive



        // Create the button element
        const button = document.createElement('button');
        button.classList.add('rounded-full', 'w-8', 'h-6', 'p-1', 'bg-green-500', 'text-center');
        button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!-- ... your SVG path data ... --></svg>';

        // Attach a click event listener to the button
        button.addEventListener('click', () => {
            // Access the post data for the clicked card
            const clickedPost = post;
            console.log('Clicked post:', clickedPost);
            // Now you can manipulate or use the data as needed
            displaySeenPost(clickedPost); // Call another function to handle displaying the post
        });

        // Append the button to the postCard
        postCard.querySelector('.flex.justify-between').appendChild(button);

        // Append the postCard to the container
        postContainer.appendChild(postCard);

        const activeStatus = postCard.querySelector('.active-status');
        isActiveId(activeStatus, post.isActive)
    });

    document.getElementById('loading-spinner').classList.add('hidden');
};

const isActiveId = (element, post) => {
    if(post){
    //    activeStatus.classList.remove('bg-red-600')
      
       console.log(69)
       element.classList.remove('bg-red-600')
       element.classList.add('bg-green-600')
    }
    else{
        console.log(106)
    }
}

const displaySeenPost = (post) => {
    const seenPost = document.createElement('div');
    seenPost.classList = 'flex my-5'
    seenPost.innerHTML = `
        
        <h1 class="w-72 h-auto">${post?.title}</h1>
        <p>${post?.view_count}</p>
        
    `;
    const markAsRead = document.getElementById('mark-as-read');
    const markAsReadString = markAsRead.innerText;
    const markAsReadValue = parseFloat(markAsReadString);
    markAsRead.innerText = markAsReadValue + 1;
    
    const seenPostContainer = document.getElementById('seen-post-container');
    seenPostContainer.appendChild(seenPost);
};


const inputField = () => {
    loadingSpinner(true)
    const inputField = document.getElementById('input-field');
    const searchText = inputField.value;
    loadAllPosts(searchText)
}

const loadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if(isLoading){
        loadingSpinner.classList.remove('hidden')
    }
}

// latest posts function

const loadLatestPost = async () => {
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/latest-posts`);
    const data = await res.json();
    console.log(data)
    showLatestPosts(data)
}

const showLatestPosts = (latestPosts) => {
    const latestPostContainer = document.getElementById('latest-posts-container');
    // postContainer.textContent = '';

    latestPosts.forEach(latestPost  => {
        const postCard = document.createElement('div');
        postCard.classList = 'lg:flex-row lg:justify-left lg:space-y-6 lg:px-5 py-10 border-2 border-black bg-gray-100 rounded-3xl';
        postCard.innerHTML = `
            <figure>
                    <img
                      src="${latestPost.cover_image}"
                      alt="Shoes" />
            </figure>
            <div class="card-body space-y-2">
                <h2 class="card-title">${latestPost?.author?.posted_date || 'No Publish Date'}</h2>
                <p>${latestPost?.title}</p>
                <p>${latestPost?.description}</p>
              <!-- profile -->
                <div class="flex space-x-4">
                    <img class="w-14 rounded-full" src="${latestPost?.profile_image}" alt="">
                    <div>
                        <h1>${latestPost.author.name || 'unknown'}</h1>
                        <h4>${latestPost?.author?.designation || 'Unknown'}</h4>
                      </div>
                    </div>
            </div>
        `
        latestPostContainer.appendChild(postCard)
    });
}

loadLatestPost()

// loadAllPosts()
