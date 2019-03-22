import { Component, OnInit,Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import { BlogService } from '../blog.service';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  addForm: FormGroup;updateForm: FormGroup;
  data:any;bTitle:any;blogs:any;
  marked = false;
  currentBlogName:any;
  currentBlogDetails:any;
  selected=[];selectedBlogsLength=0;
  ngOnInit()
  {
  //  localStorage.setItem('blogs', JSON.stringify([]));
    this.blogs=this.bs.getBlog();

  }
  constructor(private fb: FormBuilder,public bs:BlogService, private route: Router){
    this.addForm  = this.fb.group({
      blogTitle: ['', [Validators.required]],
      blogDetails: ['', [Validators.required,Validators.maxLength(200)]],
    
    });
    this.updateForm  = this.fb.group({
      blogUpdates: ['', [Validators.required,Validators.maxLength(200)]],
 
    });
  }
  save(form)
  {
    this.bs.setBlog(form.value.blogTitle,form.value.blogDetails);
    this.data=this.bs.getBlog();
    this.bTitle=this.getBlogTitle();
    this.blogs=this.bs.getBlog();
    
  }
  pageList(){
    this.bs.getBlogDetails = this.bTitle; 

    }
  getBlogTitle(){
    var blogT=[];
    var i;
    let a=this.bs.getBlog();
    for(i=0;i<a.length;i++)
    {
      blogT[i]=a[i].blogTitle;
    }
    return blogT;
   
  }
  blogSelection(blogToChange:string)
  {
    
    var id = this.selected.indexOf(blogToChange);
        if (id > -1) {
          //already selected
          this.selected.splice(id, 1);
          this.marked= false;
        }
         else {
           this.selected.push(blogToChange);
           this.marked= true;
           this.currentBlogName=blogToChange;
           this.currentBlogDetails=this.bs.getBlogDetails(blogToChange);
         }
         this.selectedBlogsLength=this.selected.length;
      }

  delete()
  {
    var t;
    for(t=0;t<this.selectedBlogsLength;t++)
    {
      this.bs.deleteBlog(this.selected[t]);
    }
    this.blogs=this.bs.getBlog();
  }
  edit(updatedBlogDetails:string){
   this.bs.editBlog(this.currentBlogName,updatedBlogDetails);
   window.location.reload();
  }
  
}

