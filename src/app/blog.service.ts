import { Injectable } from '@angular/core';
import {Blog} from './blog';
import { del } from 'selenium-webdriver/http';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
 // blogs: Blog;
  a = [];b=[];
  del:any;data:any;date:any;
  constructor(){}
    
  setBlog(blogTitle:string, blogDetails: string)
  {
    let obj = {
      blogTitle: blogTitle,
      blogDetails: blogDetails,
      createdDate:new Date().toJSON().slice(0,10),
      updatedDate:new Date().toJSON().slice(0,10)
    }
    //console.log(blogs);
    let blogs = localStorage.getItem("blogs") != null ? JSON.parse(localStorage.getItem("blogs")) : []
    blogs.push(obj);
    localStorage.setItem("blogs", JSON.stringify(blogs));
       
  
  }
 getBlog()
  {
   var a = [];
   a = JSON.parse(localStorage.getItem('blogs'));
   return a;
  }
  getBlogDetails(blogInfo:string)
  {
    var j;
    let b=this.getBlog();
    for(j=0;j<b.length;j++)
    { 
      let temp=b[j];
      if(blogInfo==b[j].blogTitle)
      {
        this.data=b[j].blogDetails;
      }
      }
      return this.data;
  }
  getBlogLastModifiedDetails(blogInfo:string)
  {
    var j;
    let b=this.getBlog();
    for(j=0;j<b.length;j++)
    { 
      let temp=b[j];
      if(blogInfo==b[j].blogTitle)
      {
        this.date=b[j].updatedDate;
       
      }
      }
      return this.date;
  }
  deleteBlog(deleteblog:string)
  {
    let b=this.getBlog();
    var j;
    for(j=0;j<b.length;j++)
    { 
      if(deleteblog==b[j].blogTitle)
      {
        //localStorage.removeItem("blogs");
        //delete b[j];
       b.splice(j);
       
      }
      localStorage.setItem("blogs", JSON.stringify(b));
      console.log(b);

      }
  }
  editBlog(blogToUpdate:string,blogUpdatedText:string){
    let b=this.getBlog();
    var j;
    for(j=0;j<b.length;j++)
    { 
      if(blogToUpdate==b[j].blogTitle)
      {
        console.log(b[j]);
        b[j].blogDetails=blogUpdatedText;
        b[j].updatedDate=new Date().toJSON().slice(0,10); 
        
      }
   }
   localStorage.setItem("blogs", JSON.stringify(b));
   console.log(b);
  }
}

