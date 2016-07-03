import {inject} from "aurelia-framework";
import {SearchProjectData} from "../dataRepository/searchProjectData";
import {Router} from "aurelia-router";
import {autocomplete} from 'jquery-ui';
//import 'jspm_packages/npm/jquery-ui@1.10.5/themes/cupertino/jquery-ui.css!';

@inject(SearchProjectData, Router)
export class SearchProject {

  constructor(searchProjectData, router) {
  		this.searchProjectData = searchProjectData;
      this.router = router;
      this.projects = [];

  	}

    bind(projects){

        //alert("I'm coming to back to result ");

  }
  	activate(params, router, navigationInstruction) {
      //this.projects = ["nooooop","wowowowowo"];
  		this.router = navigationInstruction.router;
    }

// attached(){
//    var members = [
//     {
//     value: "Rick",
//     label: "Rick",
//     desc: "group leader",
//     icon: "styles/images/rick.jpg"
//      },
//     {
//     value: "Coral!",
//     label: "Carl",
//     desc: "future leader w/ eyepatch",
//     icon: "styles/images/carl.jpg"
//     }
//    ];
//
//    $( "#members" ).autocomplete({
//             source:members,
//             select:function (event, ui) {
//                 // set the id of the user to send a message to
//                 mail_message_to_id = ui.item.id;
//             }
//
//         }).data("ui-autocomplete")._renderItem = function (ul, item) {
//             return $("<li></li>")
//                 .data("ui-autocomplete-item", item)
//                 .append($("<a></a>").html(item.label))
//                 .appendTo(ul);
//         };
//  }


  	executeSearch(searchText) {
        this.router.navigateToRoute("result",{searchText:searchText},{settings: "result-ret"});
      }

  }
