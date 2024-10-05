// show category buttons
const categoryBtnEl = async () => {
    const url = 'https://openapi.programming-hero.com/api/phero-tube/categories';
    const res = await fetch(url)
    const data = await res.json()
    showCategory(data.categories)
}

const showCategory = (category) => {
    const categoryBTn = document.getElementById('category-btn');

    category.forEach(item => {
        const div = document.createElement('div');
        div.innerHTML = `
        <button id="btn-${item.category_id}" onclick="category(${item.category_id})" class="btn active-btn">${item.category}</button>
    `
        categoryBTn.append(div);

    });
};
// button toggle styels
const btnstyles = () => {

    const x = document.getElementsByClassName('active-btn');
    for (let btn of x) {
        btn.classList.remove('bg-red-500', 'text-white', 'font-bold');
    };
};
// show videos based on category
function category(id) {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
        .then(res => res.json())
        .then(data => {

            // initially removes active styles from all buttons
            btnstyles();

            // adds active button styels when clicked
            const activeBtn = document.getElementById(`btn-${id}`)
            activeBtn.classList.add('btn', 'bg-red-500', 'text-white', 'font-bold');
            showVideos(data.category)
        });
};

// show videos
const loadvideoDetails = async (searchValue = '') => {
    const url = `https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchValue}`
    const res = await fetch(url)
    const data = await res.json()
    showVideos(data.videos)
};

// converting time
const time = (hrs) => {
    const hr = parseInt(hrs / 3600);
    const remainingHr = parseInt(hrs % 3600);
    const min = parseInt(remainingHr / 60);
    const sec = parseInt(remainingHr % 60);
    return (`${hr} hr ${min} min ${sec} sec ago`);
};

const showVideos = (video) => {

    const videocontainer = document.getElementById('videos');
    videocontainer.innerHTML = '';

    if (video.length == 0) {
        videocontainer.classList.remove('grid')
        videocontainer.innerHTML = `
        <div class="flex flex-col justify-center items-center mt-20 gap-6">
            <div>
                <img src="img/Icon.png"/>
            </div>
            <div class="text-center">
                <p class="font-bold text-2xl">Oops! Sorry,</p>
                <p class="font-bold text-2xl"> there is no content here</p>
            </div>
        </div>
        
        `;
        return;
    }

    video.forEach(item => {
        const div = document.createElement('div')
        div.classList = 'card card-compact mt-16';
        div.innerHTML = `
            <figure class="h-[200px] relative">
                <img class=" object-cover" src="${item.thumbnail}"/>

                ${item.others.posted_date ? `<span class="text-gray-300 bg-black bg-opacity-70 p-1 rounded-md absolute bottom-2 right-2">${time(item.others.posted_date)}</span>` : ''}
                
            </figure>
            <div class="flex gap-3 mt-2">
                <div>
                    <img class="w-8 h-8 rounded-full object-cover" src="${item.authors[0].profile_picture}"/>
                </div>
                <div>
                    <h3 class="font-bold text-2xl">${item.title}</h3>
                    <div class="flex gap-1 items-center">
                        <h3 class="text-gray-500 font-semibold">${item.authors[0].profile_name}</h3>
                        <span class="text-sm font-semibold  text-gray-500">${item.authors[0].verified === true ? '<img class="w-4" src="img/verified.png" />' : ''}</span>
                    </div>
                    <span class="text-sm text-gray-500">${item.others.views} views</span>
                </div>
            </div>
        `;
        videocontainer.append(div);
    });
};
// show vidoes by search
document.getElementById('searchInput').addEventListener('keyup', (event) => {
    loadvideoDetails(event.target.value)
})

loadvideoDetails();
categoryBtnEl();