import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  constructor(private router: Router){}
  ngOnInit(): void {
    setTimeout(() => {
      localStorage.removeItem("auth_token")
      localStorage.removeItem("userId");
      this.router.navigate(["sign-in"]);
    }, 3000000);  }
    
  title = "TBC Banking";

}
