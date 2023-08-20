var url = 'http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D';

var tableData=document.getElementById('table-data');
var dataRow=document.getElementsByClassName('data-row');

let tableDataUpload =()=>{
    let a=new XMLHttpRequest();
    a.open('GET',url,true);
    a.send();
    a.onreadystatechange=function(){
        if(this.status==200 && this.readyState==4){
            var main_data=JSON.parse(this.responseText);
            var table='<table id="tblDt">';
            for(let i=0;i<=5;i++){
                // console.log(main_data[i])
               table +='<tr class="data-row" id='+main_data[i].id+'><td class="column1">'+main_data[i].id+'</td><td class="column2">'+main_data[i].firstName+'</td><td class="column3">'+main_data[i].lastName+'</td><td class="column4">'+main_data[i].email+'</td><td class="column5">'+main_data[i].phone+'</td></tr>';
            }
            table +="</table>"
            tableData.innerHTML=table;
        }
        var row=$('#tblDt');
        // var row=document.getElementsByClassName('data-row')[0];
        row.on('click','tr',function(){
            var id=$(this).attr('id');
            for(i=0;i<=5;i++){
                if(main_data[i].id==id){
                var infoContent=document.getElementById('info-content');
                infoContent.style.display='block';
                infoContent.innerHTML=''
                var contentDiv=document.createElement('div');
                contentDiv.innerHTML="<b>User selected:</b>"+main_data[i].firstName+main_data[i].lastName;
                var description=document.createElement('div')
                description.innerHTML=`<b>Description: </b>
                <textarea cols="50" rows="5" readonly>
                    ${main_data[i].description}
                </textarea>`;
                var address=document.createElement('div');
                address.innerHTML=`<b>Address:</b> ${main_data[i].address.streetAddress}`;
                var city=document.createElement('div');
                city.innerHTML='<b>City:</b>'+main_data[i].address.city;
                var state=document.createElement('div');
                state.innerHTML='<b>State:</b>'+main_data[i].address.state;
                var zip=document.createElement('div');
                zip.innerHTML='<b>Zip:</b>'+main_data[i].address.zip;
                infoContent.append(contentDiv,description,address,state,zip);
                }
            } 
            for(let i=0;i<=5;i++){
            $('tr .active').removeClass('active');
            }
            $(this).addClass('active');
        });
    }
}
tableDataUpload();

let searchBox=document.getElementById('search-box');
searchBox.onkeyup=function(){
    // let input=document.getElementById('se')
    let filter=searchBox.value.toUpperCase();
    let itemName=document.getElementById('tblDt');
    let tr=itemName.getElementsByTagName("tr");
    for(let i=0;i<tr.length;i++){
        let td=tr[i].getElementsByTagName('td')[1];
        if(td){
            let textVal=td.textContent || td.innerText;
            if(textVal.toUpperCase().indexOf(filter)>-1){
                tr[i].style.display='';
            }
            else{
                tr[i].style.display="none";
            }
        }
    }
}

