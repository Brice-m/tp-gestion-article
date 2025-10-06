import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticlesService, Article } from './articles.service';

@Component({
  selector: 'app-article-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './article-detail.component.html',
})
export class ArticleDetailComponent {
  article: Article | null = null;
  editMode = false;

  constructor(private route: ActivatedRoute, private svc: ArticlesService, private router: Router) {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) this.load(id);
  }

  load(id: string) {
    this.svc.getById(id).subscribe({
      next: (res) => { if (res.code === '200') this.article = res.data; },
      error: (err) => console.error(err)
    });
  }

  back() { this.router.navigate(['/home']); }

  toggleEdit() { this.editMode = !this.editMode; }

  save() {
    if (!this.article) return;
    this.svc.save(this.article).subscribe({
      next: (res) => { if (res.code === '200') { this.article = res.data; this.editMode = false; } },
      error: (err) => console.error(err)
    });
  }

  remove() {
    if (!this.article) return;
    this.svc.delete(this.article.id).subscribe({
      next: (res) => { if (res.code === '200') this.router.navigate(['/home']); },
      error: (err) => console.error(err)
    });
  }
}
