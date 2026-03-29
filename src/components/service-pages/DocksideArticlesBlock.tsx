import React from 'react';
import { Newspaper, ExternalLink } from 'lucide-react';
import { getDocksideArticlesForService, DOCKSIDE_TAG_URL } from '@/data/docksideArticles';

interface DocksideArticlesBlockProps {
  serviceSlug: string;
  serviceName: string;
}

const DocksideArticlesBlock: React.FC<DocksideArticlesBlockProps> = ({ serviceSlug, serviceName }) => {
  const articles = getDocksideArticlesForService(serviceSlug);
  
  if (articles.length === 0) return null;

  return (
    <section className="py-12 bg-accent/30" aria-labelledby="dockside-heading">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 justify-center mb-2">
            <Newspaper className="w-5 h-5 text-atomic-turquoise" aria-hidden="true" />
            <h2 id="dockside-heading" className="text-xl font-bold text-atomic-navy">
              As Featured in Dockside Magazine
            </h2>
          </div>
          <p className="text-muted-foreground text-sm text-center mb-6">
            Read what Dockside Magazine — Muskoka's premier lifestyle publication — has to say about our {serviceName.toLowerCase()} services.
          </p>
          <div className="space-y-3">
            {articles.map((article) => (
              <a
                key={article.url}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 bg-background p-4 rounded-lg border border-border hover:border-atomic-turquoise/40 hover:shadow-sm transition-all group"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-atomic-turquoise/10 flex items-center justify-center mt-0.5">
                  <Newspaper className="w-4 h-4 text-atomic-turquoise" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-atomic-navy group-hover:text-atomic-turquoise transition-colors text-sm">
                    {article.title}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {article.brand} • {article.issue || 'Dockside Magazine'}
                  </p>
                </div>
                <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-atomic-turquoise flex-shrink-0 mt-1 transition-colors" />
              </a>
            ))}
          </div>
          <div className="text-center mt-4">
            <a
              href={DOCKSIDE_TAG_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-atomic-turquoise hover:underline inline-flex items-center gap-1"
            >
              View all Dockside Magazine features <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DocksideArticlesBlock;
