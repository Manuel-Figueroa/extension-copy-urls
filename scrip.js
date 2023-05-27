const boton= document.getElementById("btn-urls"),
btn_modal=document.getElementById('btn-modal'),
btn_close=document.getElementById('btn-close'),
btn_sl=document.getElementById('btn-urls-sl');

async function viewElements() {
    const container=document.getElementById('cuerpo'),
    tab = await chrome.tabs.query({}),
    div2=document.createElement('div'),
    cuadro=document.getElementById('cuadro');

    div2.style.height='4cm';
    div2.style.width='8cm';
    div2.style.overflow='auto';
    div2.setAttribute('id','temp');
    select_all_option(div2);
    for(let i=0; i< tab.length; i++){
        const check = document.createElement("input"),
        label = document.createElement("span"),
        br = document.createElement("br");

        check.setAttribute('type','checkbox');
        check.setAttribute('value',tab[i].url);
        check.setAttribute('class','check');
        label.textContent= tab[i].title.substring(0,20);
        div2.appendChild(check);
        div2.appendChild(label);
        div2.appendChild(br);
    }
    container.appendChild(div2);
    cuadro.style.height='5cm';
    cuadro.style.width='10cm';
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
    
    check.addEventListener('click',( e )=> {
        const checks=document.getElementsByClassName('check');
        for (let i = 0; i < checks.length; i++) 
            checks[i].checked=e.target.checked;
        
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
    for (let i = 0; i < checks.length; i++)
            if(checks[i].checked){
                txt_url.textContent += checks[i].value+"\n";
                elements_active=true;
            }
        txt_url.select();
        document.execCommand("copy");
        div.removeChild(txt_url);
        btn_sl.style.backgroundColor=(elements_active)?"green":"red";
        btn_sl.textContent=(elements_active)?"Listo":"No hay elementos seleccionados";
}
function close_modal(){
    const temp_div=document.getElementById('temp'),
    cuadro=document.getElementById('cuadro');
    temp_div.remove();
    cuadro.style.height='0.9cm';
    cuadro.style.width='5cm';
}
async function mov(){
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
    boton.style.backgroundColor="green";
    boton.textContent="Listo"
}

boton.addEventListener('click',mov);
btn_modal.addEventListener('click',viewElements);
btn_close.addEventListener('click',close_modal);
btn_sl.addEventListener('click',urls_sl);

