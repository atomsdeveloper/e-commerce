import React from 'react';

// Icons
import { Search as SearchIcon } from 'lucide-react';

// Components
import { Input } from './ui/input';
import { Button } from './ui/button';

export const Search = () => {
  return (
    <section className="flex w-full h-20 justify-center items-center gap-1">
      <Input
        className="h-10 w-full focus-visible:ring-0 focus-visible:ring-offset-0"
        type="text"
        placeholder="Buscar Restaurantes"
      />
      <Button
        variant={'ghost'}
        className="flex items-center justify-center h-10 w-10 rounded-lg p-3 bg-secondary hover:bg-slate-100"
      >
        <SearchIcon size={16} />
      </Button>
    </section>
  );
};
