import { Component, OnInit,Input } from '@angular/core';
import { BlogService } from '../blog.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss']
})
export class BlogDetailComponent implements OnInit {
  constructor( private route: ActivatedRoute,public bs:BlogService) { }
  blogTitle:any;blogDetails:any;blogLastUpdated:any;
 sub;
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.blogTitle = params['blogTitle'];
      });
    //  this.blogTitle = this.bs.getBlogDetails; 
      this.getBlogData();
      this.getBlogLastModified();
       }
       
    getBlogData()
    {
      this.blogDetails=this.bs.getBlogDetails(this.blogTitle);
      return this.blogDetails;
    }
    getBlogLastModified()
    {
      this.blogLastUpdated=this.bs.getBlogLastModifiedDetails(this.blogTitle);
      return this.blogLastUpdated;
    }
    
  }
  

