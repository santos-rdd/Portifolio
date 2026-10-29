
const container = document.getElementsByClassName('moreinfos')[0];

async function getProjects(){
    try{
        const data = await fetch('https://portifolio-xw4h.onrender.com/getInfos');

        if (!data.ok) {
            throw new Error(`Erro na requisição: ${data.status}`);
        }

        const dataReceive = await data.json();
        return dataReceive;
    } catch (err){
        throw err;
    }
} 

const projectsReceive = await getProjects();

function createElementAndClass(tag, className, idReceive = '', secondClass = '', threeClass = ''){
    const element = document.createElement(tag);

    if(className){
        element.classList.add(className);
    }
    
    if(idReceive){
        element.id = idReceive;
    }
    
    if(secondClass){
        element.classList.add(secondClass);
    }
    
    if(threeClass){
        element.classList.add(threeClass);
    }

    return element; 
}

function createContent(numberProject = '00', stackProject = 'Carregando Stack', titleProject = 'Carregando',  moreProject = 'Projeto ainda em carregamento', arrayTags = [], arrayImage = [], linkReceive){
    
    let current = 0;
    let maxStacks = 0;
    const project = createElementAndClass('div', 'myProject');

    const containerImages = createElementAndClass('div', 'containerImages');
        const carouselInner = createElementAndClass('div', 'carousel', 'carousel');
        const imageNumber = createElementAndClass('div', 'imageNumber');
            const pCurrent = createElementAndClass('p');
            const pBar = createElementAndClass('p');
            const pMax = createElementAndClass('p');

        for(let x = 0; x < arrayImage.length; x++){
            const slide = createElementAndClass('div', 'slide');      
            const img = createElementAndClass('img');
            img.src = arrayImage[x];
            slide.appendChild(img);
            carouselInner.appendChild(slide);
        }

        pCurrent.textContent = 1;
        pBar.textContent = '/';
        pMax.textContent = arrayImage.length;

    const prevBtn = createElementAndClass('button', 'next', '', 'button');
        const imgSetPrev = createElementAndClass('img');
        imgSetPrev.src = './assets/image/icons/right.png';
        
    const nextBtn = createElementAndClass('button', 'prev', '', 'button');
        const imgSetNext = createElementAndClass('img');
        imgSetNext.src = './assets/image/icons/right.png';

    const infosProject = createElementAndClass('div', 'infosProject');
        const numberAndName = createElementAndClass('div', 'numberAndName');
            const pNumber = createElementAndClass('p');
                pNumber.textContent = numberProject;
            const spanStack = createElementAndClass('span');
                spanStack.textContent = stackProject;
        
        const simpleExplanation = createElementAndClass('div', 'simpleExplanation');
            const h2Name = createElementAndClass('h2');
                h2Name.textContent = titleProject;
            const pLorem = createElementAndClass('p');
                pLorem.textContent = moreProject;

        const tags = createElementAndClass('div', 'tags');
                for(const currentTag of arrayTags){
                    maxStacks++;
                    if(maxStacks > 3){
                        continue;
                    }
                    const stacktags = createElementAndClass('div', 'stackTags');
                    stacktags.textContent = currentTag;
                    tags.appendChild(stacktags);
                }
        
    const seeMoreDiv = createElementAndClass('div', 'seeMore');
        const seeMoreProject = createElementAndClass('p');
            seeMoreProject.textContent = 'ver projeto';
            const seeMoreSpan = createElementAndClass('span');
            seeMoreSpan.textContent = '>';

        const gitHubLink = createElementAndClass('a', 'git');
        gitHubLink.href = linkReceive;
        gitHubLink.target = '_blank';
        gitHubLink.rel = 'noopener noreferrer';
            const gitHubImage = createElementAndClass('img');
            gitHubImage.src = './assets/image/github.png';

    project.appendChild(containerImages);
    project.appendChild(prevBtn);
    project.appendChild(nextBtn);
    project.appendChild(infosProject);
    project.appendChild(seeMoreDiv);
    
    containerImages.appendChild(carouselInner);

    containerImages.appendChild(imageNumber);

    imageNumber.appendChild(pCurrent);
    imageNumber.appendChild(pBar);
    imageNumber.appendChild(pMax);

    prevBtn.appendChild(imgSetPrev);
    nextBtn.appendChild(imgSetNext);

    numberAndName.appendChild(pNumber);
    numberAndName.appendChild(spanStack);

    infosProject.appendChild(numberAndName);
    infosProject.appendChild(simpleExplanation);
    infosProject.appendChild(seeMoreDiv);

    simpleExplanation.appendChild(h2Name);
    simpleExplanation.appendChild(pLorem);
    simpleExplanation.appendChild(tags);

    seeMoreDiv.appendChild(seeMoreProject);
    seeMoreDiv.appendChild(gitHubLink);
    seeMoreProject.appendChild(seeMoreSpan);

    gitHubLink.appendChild(gitHubImage);
        
    const trackImages = Array.from(carouselInner.children);
    function update(){
        const slidesWidth = trackImages[0].getBoundingClientRect().width;
        carouselInner.style.transform = `translateX(-${current * slidesWidth}px)`;
    }   
        
    nextBtn.addEventListener('click', ()=>{
        current++;
        if(current >= trackImages.length){
            current = 0;
            pCurrent.textContent = 0;
        }
        update();
        pCurrent.textContent = current + 1;
    })
    
    prevBtn.addEventListener('click', ()=>{
        current--;
        
        if(current < 0){
            current = trackImages.length - 1;
            pCurrent.textContent = trackImages.length - 1;
        }
        
        update();
        pCurrent.textContent = current + 1;
    })

    return project;
}

for(const currentItem of projectsReceive.data){
    const project = createContent(
        currentItem.number,
        currentItem.type,
        currentItem.name,
        currentItem.more,
        currentItem.stackTags,
        currentItem.imagesProject,
        currentItem.link
    );

    container.appendChild(project);
}

const back = document.getElementById('back');
const sobre = document.getElementById('sobre');
const projetos = document.getElementById('projetos');
const openProjects = document.getElementById('openProjects');
const contantos = document.getElementById('contantos');

const infos = document.getElementById('infos');
const moreProjects = document.getElementById('moreProjects');
const contactMeDiv = document.getElementById('contactMeDiv');

back.addEventListener('click',()=>{   
    window.scrollTo({
        top: '0',
        behavior: 'smooth'
    })
})

sobre.addEventListener('click',()=>{   
    infos.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    })
})

projetos.addEventListener('click',()=>{   
    moreProjects.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    })
})

openProjects.addEventListener('click',()=>{   
    moreProjects.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    })
})

contantos.addEventListener('click',()=>{   
    contactMeDiv.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    })
})

