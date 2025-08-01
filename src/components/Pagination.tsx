import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import './css/pagination.css'
import { useState } from 'react';

type Props = {
    handlePage: (page: number) => void;
    total: number;
}

export default function BasicPagination({ handlePage, total }: Props) {
    const [page, setPage] = useState(1);

    const changePage = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
        handlePage(value);
        console.log("Página ", value);
    }

  return (
    <div className='pagination-container'>
        <Stack spacing={2}>
            <Pagination onChange={changePage} page={page} count={total} sx={{ display: "flex", justifyContent: "center"}}  color="primary" />
        </Stack>
    </div>
  );
}