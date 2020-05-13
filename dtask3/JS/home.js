window.onload = function() {
    var UIcontrol = (function(){
    var DOM= {
        add:document.querySelector('.list'),
        new:document.querySelector('.NewEmployee'),
        edit:document.querySelector('.edit'),
        addbtn:document.querySelector('.add'),
        //Id:document.querySelector('.Id'),
        Name:document.querySelector('.Name'),
        Salary:document.querySelector('.Salary'),
        Age:document.querySelector('.Age'),
        chname:document.querySelector('.chname'),
        chsal:document.querySelector('.chsal'),
        chage:document.querySelector('.chage'),
        close:document.querySelector('.close'),
        cancel:document.querySelector('.cancel')
};
    return {
        addItem:function(id,name)
        {
            //console.log(id,name);
            //console.log(id);
          var html =' <div class= "list" method="get"><div class ="id">ID :%id% </div>Name :<a class ="name" href="employee.html?id=%id%">%name%</a>';
         // console.log(html);
          var newHtml = html.replace(/%id%/g,id);
          //console.log(newHtml);
          newHtml=newHtml.replace(/%name%/g,name);
          //console.log(newHtml);
          DOM.add.insertAdjacentHTML('beforebegin',newHtml);                
        },
      getDom : function () {
          return DOM;
      }
    };
})();
     async function getEmployee() {
         var data = await fetch('http://dummy.restapiexample.com/api/v1/employees');
         var employeelist = await data.json();
         //console.log(employeelist);
         var employees =  employeelist.data;
        // console.log(employees.length);
         for ( let i=0 ;i<employees.length; i++)
         {
             //console.log(employees[i].id);
             UIcontrol.addItem(employees[i].id,employees[i].employee_name);
             //console.log("hi");
         }
        }
     getEmployee();
     var dom =UIcontrol.getDom();
     //console.log(dom.new);
         dom.new.addEventListener('click',function() {
       //dom.edit.style.display = 'block';
         if(dom.edit.style.display =='block') {
            dom.edit.style.display='none';
        } else {
            dom.edit.style.display='block';
        }
       //console.log("hi");
});
     //console.log(dom.Id.value);
     dom.addbtn.addEventListener('click', async function() {
     var chk =check(dom.Name.value,
                    dom.Salary.value,
                    dom.Age.value);
    //console.log(chk);
     if(chk) {
        var promise = await fetch('http://dummy.restapiexample.com/api/v1/create',{
         method :"POST",
         mode: 'cors', 
         cache: 'no-cache',
         credentials: 'same-origin',
         headers: {
              'Content-Type': 'application/json'
          },
         redirect: 'follow', 
         referrerPolicy: 'no-referrer', 
        });
         var consume = await promise.json();
        // console.log(consume);
        if(consume.status =="success"){
            window.alert('user added');
            UIcontrol.addItem(document.querySelectorAll(".list").length, dom.Name.value);
        }
        else{
            window.alert('Sorry failed');
        }
        //dom.Id.value="";
        dom.Name.value="";
        dom.Salary.value="";
        dom.Age.value="";
        dom.edit.style.display="none";
     }
});
     function check(name,sal,age) {
        var verifyname,verifysal,verifyage;
        if(name == "" &&
           sal == "" &&
           age == "") {
            dom.chname.style.display='block';
            dom.chsal.style.display='block';
            dom.chage.style.display='block';
           // return false;
           }
        if(name.match(/[^A-Za-z ]+/g)!=null || name =="") 
        {
            dom.chname.style.display='block';
        }else {
            dom.chname.style.display='none';
            verifyname=1;
        }
        if(sal<1000 || sal=="") {
            dom.chsal.style.display='block';
        }else {
            dom.chsal.style.display='none';
            verifysal=1;
        }
        if(age.split('.').length!=1 || age=="") {
            dom.chage.style.display='block';
        }else {
            dom.chage.style.display='none';
            verifyage=1;
        }
        if(verifyname===1 && verifysal===1 && verifyage===1) {
            //console.log("pet");
            return true;
        }else return false;
     }
     dom.close.addEventListener('click',function() {
         dom.edit.style.display='none';
     });
     dom.cancel.addEventListener('click',function() {
         dom.edit.style.display='none';
     }); 
}