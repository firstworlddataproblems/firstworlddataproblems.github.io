function tabpanel_mouseover(node)
{
  
  var panel_1_width = document.getElementById("tabpanel_1_sublist").offsetWidth; // Needed for IE
  var previous = document.getElementById("tabpanel_1"); 	//Declare previous panel as panel 1
  var panels= document.getElementById("tab_ul");		//get tab panel tree
  //look for default node
  for(i=0;i<panels.childNodes.length;i++){
	  if(panels.childNodes[i].className=="tabpanel_default"){
		  previous=panels.childNodes[i];
		  
		  break;
	  }
  }
  previous.className=""; //De-activate previous item
  node.className = "tabpanel_default"; // Activate the hovered item
}