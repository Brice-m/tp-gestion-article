import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ArticlesService, Article } from './articles.service';
declare const UIkit: any;

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  articles: Article[] = [];
  model: Article = { id: '', title: '', desc: '', author: '', imgPath: '' };

  constructor(private svc: ArticlesService, private router: Router) {
    this.load();
  }

  load() {
    this.svc.getAll().subscribe({
      next: (res) => { if (res.code === '200') this.articles = res.data || []; },
      error: (err) => console.error(err)
    });
  }

  open(id: string) { this.router.navigate([`/article/${id}`]); }

  add() {
    if (!this.model.title || !this.model.desc) return;
    this.svc.save(this.model).subscribe({
      next: (res) => {
        if (res.code === '200') {
          this.load();
          try { UIkit.modal('#add-article-modal')?.hide(); } catch { }
          this.model = { id: '', title: '', desc: '', author: '', imgPath: '' };
        }
      },
      error: (err) => console.error(err)
    });
  }
}
