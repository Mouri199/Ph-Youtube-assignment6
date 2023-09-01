function openBlog() {
    window.open('blog-answer.html', '_blank')
}


const loadCategory = async () => {
    const res = await fetch("https://openapi.programming-hero.com/api/videos/categories");
    const data = await res.json();


    const buttonContainer = document.getElementById('button-container');
    const viewData = data.data;

    // console.log(viewData);

    viewData.forEach((info) => {

        // console.log(data.category);
        const div = document.createElement('div');
        div.innerHTML = `<button onclick="loadInformation('${info.category_id}')" class="btn capitalize hover:bg-red-500 hover:text-white text-black">${info.category}</button>
        `

        buttonContainer.appendChild(div);
    })


};



let value;

const loadInformation = async (categoryAllId = '1000') => {
    value = categoryAllId;
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryAllId}`);
    const data = await res.json();
    let details = data.data;
    visualItem(details);
};


const visualItem=(details) =>{
    
if(details.length==0){
    drawingBtn(true)
}
else{
    drawingBtn(false)
}

    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = "";
    



    details.forEach((all) => {

        let values = all.others.posted_date;
        const totalSec = values;
        
        const remainingMin = totalSec % 60;
        const totalMin = (totalSec - remainingMin) / 60;

        const remainingHour = totalMin % 60;
        const totalhour =(totalMin - remainingHour) / 60;

        const time = values.length !== 0 ? `${totalhour}hrs ${remainingHour}min ago` : "";


        const div = document.createElement('div');
        div.classList=`card card-compact mt-5 h-[300px] mx-auto
         max-w-[300px]`
        div.innerHTML = `
        <figure class="h-[210px]"><img src="${all.thumbnail}" />
        <p class="absolute bottom-36 right-2 text-white bg-black rounded">${time}</p>
        </figure>
        <div class=" card-body flex flex-row">
            <img class="h-[40px] w-[40px] rounded-full" src="${all.authors[0].profile_picture}" alt="">
            <h2 class="card-title">${all.title}</h2>
        </div>
        <div class="ml-16">
        <p class="flex"> ${all.authors[0].profile_name} <img src="${all.authors[0].verified ? './image/badge.svg' : ''}"/> </p>
       
        <p class="mb-5">${all.others.views} views</p>
        </div>`


        cardContainer.appendChild(div);


    })
}

const sortingData = async() =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${value}`);
    const data = await res.json();
    let details = data.data;
    const sortValue =details.sort((a,b)=>{

        let num1 = a.others.views.slice(0,-1);
        let num2 = b.others?.views.slice(0,-1);

        return num2-num1;
    }) 
    visualItem(sortValue);
}



const drawingBtn=(button)=>{
if(button){
    const showbtn = document.getElementById('drawingBtn');
    showbtn.classList.remove('hidden');
}
else{
    const showbtn = document.getElementById('drawingBtn');
    showbtn.classList.add('hidden');
}
}




loadCategory();
loadInformation('1000');