var i=0;
var desc='Styling Your Life.';
var userlist=['admin'];
var pwlist=['12345'];

var drinkList=['latte', 'black', 'cappuccino', 'macchiato'];
var foodList=['pancake', 'cookie', 'pudding', 'iceCream'];
var menuList=drinkList.concat(foodList);
var priceList=[25, 35, 45, 55, 20, 30, 40, 50];

var drinkOption=['hot', 'cold'];
var foodOption=['strawberry', 'mango'];
var extraCharge=[0, 2];

function typeWriter() {
  if(i<desc.length) {
    var char=desc.charAt(i);
    var speed=char==' ' ? 400 : 100;
    document.getElementById("slogon").innerHTML+=char;
    i++;
    setTimeout(typeWriter,speed);
  }
}

function login() {
  var username=document.getElementById('username').value;
  var password=document.getElementById('password').value;
  var success=false;
  
  for(var i=0; i<userlist.length; i++) {
    if(username==userlist[i] && password==pwlist[i]) {
      localStorage.user=username;
      success=true;
      break;
    }
  }
  
  if(!success) {
    alert('Login Failed.');
  }
}

function logout() {
  localStorage.removeItem('user');
  location.reload();
}

function checkUser() {
  var user=localStorage.user;
  var button=document.getElementsByClassName("login");
  
  if(user!=undefined) {
    for(var i=0; i<button.length; i++) {
      button[i].innerHTML=user+" (click to log out)";
      button[i].setAttribute("onclick", "logout(); return false;");
    }
    desc='Welcome Back, '+user+'.';
  }
}

function forcedLogin() {
  var user=localStorage.user;
  
  if(user==undefined) {
    alert("You should log in first to use this function.");
    location.replace("../login.html");
  }
}

function hideBar() {
  var nav=document.getElementById("navtop");
  var footer=document.getElementById("footer");
  nav.className="navtop_hide";
  footer.className="footer_hide";
}

function showBar() {
  var nav=document.getElementById("navtop");
  var footer=document.getElementById("footer");
  nav.className="";
  footer.className="";
  setInterval(hideBar, 3000);
}

function showMenu() {
  var navMenu=document.getElementById("navMenu").style;
  navMenu.zIndex="9999";
  navMenu.display="flex";
}

function hideMenu() {
  var navMenu=document.getElementById("navMenu").style;
  navMenu.zIndex="-1";
  navMenu.display="none";
}

function addOrder(item) {
  var targetItem=document.getElementById(item);
  targetItem.style.background="#f00";
  targetItem.setAttribute("onmouseover", "removeOrder(id); calTotal();");
  targetItem.innerHTML="-";
  
  var itemAdded = document.getElementById("sample_add");
  var cln = itemAdded.cloneNode(true);
  document.getElementById("order_list").appendChild(cln);
  
  var addedRows=document.getElementById("order_list").getElementsByTagName("div");
  var targetRow=addedRows[addedRows.length-1];
  
  targetRow.id=targetRow.id.replace("sample", item);
  
  targetRow.getElementsByClassName("itemName")[0].innerHTML=item;
  
  var qty=targetRow.getElementsByClassName("qty")[0];
  qty.id=qty.id.replace("sample", item);
  
  var optionList=null;
  for(var i=0; i<foodList.length; i++) {
    if(foodList[i]==item) {
      optionList=foodOption;
      break;
    }
  }
  if(optionList==null) {
    optionList=drinkOption;
  }

  for(var i=0; i<optionList.length; i++) {  
    var option=targetRow.getElementsByClassName("sample_option")[i];
    option.id=item+"_"+optionList[i];
    option.value=option.id;
    option.name=option.name.replace("sample", item);
    
    var label=targetRow.getElementsByClassName("optionName")[i];
    label.setAttribute("for", item+"_"+optionList[i]);
    label.innerHTML=optionList[i];
  }
  
  for(var i=0; i<menuList.length; i++) {
    if(menuList[i]==item) {
      var price=priceList[i];
      
      var retailPrice=targetRow.getElementsByClassName("retailPrice")[0];
      retailPrice.id=retailPrice.id.replace("sample", item);
      retailPrice.value=price;
      
      var subtotal=targetRow.getElementsByClassName("subtotal")[0];
      subtotal.id=subtotal.id.replace("sample", item);
      subtotal.value=price;
      
      break;
    }
  }
  

}

function calSubtotal(item) {
  var string=item.split("_");
  var itemName=string[0];
  var qty=document.getElementById(itemName+"_qty").value;
  var retailPrice=document.getElementById(itemName+"_retailPrice").value;
  
  var option=document.getElementsByName(itemName+"_option");
  
  var optionPrice=0;
  
  for(var i=0; i<option.length; i++) {
    if(option[i].checked==true) {
      optionPrice=extraCharge[i];
    }
  }
  
  document.getElementById(itemName+"_subtotal").value=parseInt(qty)*parseInt(retailPrice)+optionPrice;
}

function calTotal() {
  var subtotals=document.getElementsByClassName("subtotal");
  var total=0;
  for(var i=0; i<subtotals.length; i++) {
    total+=parseInt(subtotals[i].value);
  }
  document.getElementById("total").value=total;
}

function enableOption(item) {
  var string=item.split("_");
  var itemName=string[0];
  var qty=document.getElementById(item).value;
  var option=document.getElementsByName(itemName+"_option");

  for(var i=0; i<option.length; i++) {
    if(qty!=""&&qty!=null) {
      option[i].disabled=false;
    } else {
      option[i].disabled=true;
    }
  }
}

function removeOrder(item) {
  var targetItem=document.getElementById(item);
  targetItem.style.background="#66f";
  targetItem.setAttribute("onmouseover", "addOrder(id)");
  targetItem.innerHTML="+";
  
  var item=document.getElementById(item+"_add");
  document.getElementById("order_list").removeChild(item);
}

function showForm() {
  var quantities=document.getElementsByClassName("qty");
  for(var i=0; i<quantities.length; i++) {
    if(quantities[i].value==""||quantities[i].value==null) {
      alert("You should check for all quantities have been filled in!");
      return;
    }
  }
  var total=document.getElementById("total").value;
  var location=document.getElementsByName("location");
  
  var method=null;
  
  for(var i=0; i<location.length; i++) {
    if(location[i].checked) {
      method=location[i].value;
    }
  }
  alert("Total: " + total + "\nMethod: " + method);
}