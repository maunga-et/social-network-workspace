import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { Post } from '@social-network-workspace/core';
import { PostItem } from '../post-item/post-item';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'lib-post-list',
  imports: [PostItem, NgIf, NgFor],
  templateUrl: './post-list.html',
  styleUrl: './post-list.css',
})
export class PostList {
    @Input() posts: Post[] = [];
}
