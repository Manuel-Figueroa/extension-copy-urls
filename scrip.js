const btn_all= document.getElementById("btn-urls"),
btn_modal=document.getElementById('btn-modal'),
btn_close=document.getElementById('btn-close'),
btn_sl=document.getElementById('btn-urls-sl'),
btn_pages=document.getElementById('btn-pages');

let selection_type='',
active_urls=[];
function create_subcontainer(){
    const container=document.getElementById('element-container'),
    subcontainer=document.createElement('div'),
    root_element=document.getElementById('root-element');
    subcontainer.style.height='4cm';
    subcontainer.style.width='8cm';
    subcontainer.style.overflow='auto';
    subcontainer.setAttribute('id','temp');
    select_all_option(subcontainer);
    container.appendChild(subcontainer);
    root_element.style.height='5cm';
    root_element.style.width='10cm';
    
    return subcontainer;
}
function create_rowCheck(subcontainer,text_row){
    const check = document.createElement("input"),
    label = document.createElement("span"),
    br = document.createElement("br");

    check.setAttribute('type','checkbox');
    check.setAttribute('class','check');
    label.textContent= text_row;
    subcontainer.appendChild(check);
    subcontainer.appendChild(label);
    subcontainer.appendChild(br);
    return  check;
}
async function viewElements() {
    const tab = await chrome.tabs.query({}),
    div2=create_subcontainer();
    active_urls=[];
    for(let i=0; i< tab.length; i++){
        if(!active_urls.includes(tab[i].url)){
            create_rowCheck(div2,tab[i].title.substring(0,20));
            active_urls.push(tab[i].url);
        }
    }
    
    selection_type='u';
}
async function view_pages(){
    const tab = await chrome.tabs.query({}),
    div2=create_subcontainer();

    let arr_pages=[];
    for(let i=0; i< tab.length; i++){
        const page_item=tab[i].url.split('://')[1].split('/')[0];
        if(!arr_pages.includes(page_item))
            arr_pages.push(page_item);
        if(!active_urls.includes(tab[i].url))
            active_urls.push(tab[i].url);
    }
    for(let i=0; i< arr_pages.length; i++){
        const check = create_rowCheck(div2, arr_pages[i]);        
        check.setAttribute('value',arr_pages[i]);
    }
    selection_type='p';
}

function select_all_option(node_parent) {
    const check = document.createElement("input"),
    label = document.createElement("span"),
    br = document.createElement("br");

    check.setAttribute('type','checkbox');
    check.setAttribute('value','all');
    label.textContent= 'Seleccionar todo';
    node_parent.appendChild(check);
    node_parent.appendChild(label);
    node_parent.appendChild(br);
    
    check.addEventListener('click',( {target} )=> {
        const checks=document.getElementsByClassName('check');
        for (let i = 0; i < checks.length; i++) 
            checks[i].checked=target.checked;
        
    })
}
function urls_sl(){
    const checks=document.getElementsByClassName('check'),
    txt_url=document.createElement("textarea"),
    div=document.getElementById('for_txt');
    let elements_active=false;

    txt_url.style.position = "absolute";
    txt_url.style.left = "-9999px";
    div.appendChild(txt_url);
    
    for (let i = 0; i < checks.length; i++){
        if(checks[i].checked){
            switch (selection_type) {
                case 'u':
                    txt_url.textContent += active_urls[i]+"\n";
                    elements_active=true;
                    break;
                case 'p':
                    const result = active_urls.filter(url_i => url_i.includes(checks[i].value));
                    result.forEach( element => txt_url.textContent += element+"\n");
                    elements_active=true;
                    break;
            }
        }
    }

    txt_url.select();
    document.execCommand("copy");
    div.removeChild(txt_url);
    btn_sl.style.backgroundColor=(elements_active)?"green":"red";
    btn_sl.textContent=(elements_active)?"Listo":"No hay elementos seleccionados";
}
function close_modal(){
    const temp_div=document.getElementById('temp'),
    root_element=document.getElementById('root-element');
    temp_div.remove();
    root_element.style.height='0.9cm';
    root_element.style.width='5cm';
    btn_sl.style.backgroundColor="steelblue";
    btn_sl.textContent="Obtener solo seleccionados";
}
async function allUrls(){
    let queryOptions = {};
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    const txt_url=document.createElement("textarea"),
    div=document.getElementById('for_txt'),
    tab = await chrome.tabs.query(queryOptions);
    txt_url.style.position = "absolute";
    txt_url.style.left = "-9999px";
    div.appendChild(txt_url)
    
    for(let i=0; i< tab.length; i++)
        txt_url.textContent += tab[i].url+"\n";
    
    txt_url.select();
    document.execCommand("copy");
    div.removeChild(txt_url);
    btn_all.style.backgroundColor="green";
    btn_all.textContent="Listo"
}

btn_all.addEventListener('click',allUrls);
btn_modal.addEventListener('click',viewElements);
btn_close.addEventListener('click',close_modal);
btn_pages.addEventListener('click',view_pages);
btn_sl.addEventListener('click',urls_sl);

