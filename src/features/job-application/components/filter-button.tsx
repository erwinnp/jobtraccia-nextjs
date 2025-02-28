'use client';
import { useQueryState } from 'nuqs';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const FilterButton = () => {
  const [filter, setFilter] = useQueryState('filter', { defaultValue: '' });

  return (
    <Select
      value={filter || ''}
      onValueChange={(value) => setFilter(value === 'all' ? null : value)}
    >
      <SelectTrigger className='w-[180px]'>
        <SelectValue placeholder='Select a filter' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Filter</SelectLabel>
          <SelectItem value='all'>All</SelectItem>
          <SelectItem value='active'>Active</SelectItem>
          <SelectItem value='archived'>Archived</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default FilterButton;
