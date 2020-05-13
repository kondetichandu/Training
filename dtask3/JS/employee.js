
    window.onload=function() {
    const queryString = window.location.search;
   //console.log(queryString);
   //console.log(queryString);
   const urlParams = new URLSearchParams(queryString);
   //console.log(urlParams.entries());
   let id= urlParams.get('id');
   id=id-1;
   //console.log(id);
   var UIcontrol = (function() {
    var DOM = {
       details:document.querySelector('.details'),
       ID:document.querySelector('.cheid'),
       Name:document.querySelector('.chename'),
       Salary:document.querySelector('.chesal'),
       Age:document.querySelector('.cheage'),
       edit: document.querySelector('.edit'),
       update_btn:document.querySelector('.update_btn'),
       upd:document.querySelector('.btn'),
       okncancel:document.querySelector('.okncancel'),
       ok:document.querySelector('.ok'),
       cancel:document.querySelector('.cancel'),
       updid:document.querySelector('.UID'),
       updname:document.querySelector('.UName'),
       updsalary:document.querySelector('.USalary'),
       updage:document.querySelector('.UAge'),
       head:document.querySelector('.head'),
       chname:document.querySelector('.chname'),
       chsal:document.querySelector('.chsal'),
       chage:document.querySelector('.chage'),
       close:document.querySelector('.close'),
       back:document.querySelector('.back')
    };
    return {
      Change:function(id,name,Salary,age) {
        //console.log(id);
        DOM.ID.textContent=id;
        DOM.Name.textContent=name;
        DOM.Salary.textContent=Salary;
        DOM.Age.textContent=age;
        //DOM.updid.value = id;
        //console.log(DOM.updid.value);
        DOM.updname.value = name;
        DOM.updsalary.value = Salary;
        DOM.updage.value = age;
      },
      getDom:function() {
        return DOM
      }
    };
    console.log(DOM.updid.value);
   }) ();
    async function Assign(id){
    var get= await fetch('http://dummy.restapiexample.com/api/v1/employees');
    var employeelist=await get.json();
    var employee = employeelist.data[id];
    UIcontrol.Change(employee.id,
    employee.employee_name,
    employee.employee_salary,
    employee.employee_age);
  }
    Assign(id);
    var dom = UIcontrol.getDom();
    dom.upd.addEventListener('click',function() {
    //dom.details.style.display = 'none';
    dom.edit.style.display='block';
    //dom.update_btn.style.display='none';
    //dom.okncancel.style.display='block';
    //dom.head.style.display='none';
  });
      dom.back.addEventListener('click',function() {
      window.history.back();
   });
  dom.cancel.addEventListener('click', function() {
    dom.edit.style.display='none';
    //dom.head.style.display='block';
  });
  dom.close.addEventListener('click',function() {
    dom.edit.style.display='none';
  });
  //console.log(dom.ID.textContent);
  dom.ok.addEventListener('click', async function() {

    //dom.head.style.display='block';
    var chk= check(dom.updname.value,
                   dom.updsalary.value,
                   dom.updage.value);
              if(chk) {
                  dom.edit.style.display="none";
                  var urlParams = new URLSearchParams(window. location.search);
                  var id = urlParams.get('id');
                  var promise = await fetch('http://dummy.restapiexample.com/api/v1/update/{id}',{
                  method :'PUT',
                  mode: 'cors', 
                  cache: 'no-cache',
                  credentials: 'same-origin',
                  headers: {
                  'Content-Type': 'application/json; charset=UTF-8'
                  },
                  redirect: 'follow', 
                  referrerPolicy: 'no-referrer', 
                  //body: JSON.stringify(data)
              });
              //console.log(add);
              var consume = await promise.json();
              //console.log(check);
              if(consume.status == "success"){
                  window.alert("updated success fully");
                  
                  //dom.ID.textContent = dom.updid.value;
                  //console.log(DOM.age.textContent);
                  dom.Name.textContent = dom.updname.value;
                  dom.Salary.textContent = dom.updsalary.value;
                  dom.Age.textContent = dom.updage.value;
              }
                   }
             //dom.head.style.display='block';
  });
  var check = function (uname, 
                        usal,
                        uage) {
              var verifyname,verifysal,verifyage;
              if(uname == "" ||
                 usal == "" ||
                 uage == "") {
                  dom.chname.style.display='block';
                  dom.chsal.style.display='block';
                  dom.chage.style.display='block';
                            //return false;
              }
              if(uname.match(/[^A-Za-z ]+/g)!=null || uname =="") 
              {
                dom.chname.style.display='block';
              }else {
                dom.chname.style.display='none';
                  verifyname=1;
              }
              if(usal<1000 || usal=="") {
                dom.chsal.style.display='block';
              }else {
                dom.chsal.style.display='none';
                verifysal=1;
              }
              if(uage.split('.').length!=1 || uage=="") {
                dom.chage.style.display='block';
              }else {
                  dom.chage.style.display='none';
                  verifyage=1;
              }
              if(verifyname===1 && verifysal===1 && verifyage===1) {
                  //console.log("pet");
                  return true;
              }else return false;
        };
}