import qs from 'qs';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { PList, User, paramType } from '../../types/a';
import { cleanObejct, useDebounce } from '../../utils/cleanObject';
import List from './list';
import SearchPanel from './search-panel';
import { useAsync } from '../../utils/useAsync';
import { useHttp } from '../../utils/http';
interface IProjectListProps {
}
// const apiUrl = process.env.REACT_APP_API_URL
const ProjectList: React.FunctionComponent<IProjectListProps> = (props) => {
    const [params, setParams] = useState<paramType>({
        name: "",
        personId: ""
    })
    const [user, setUser] = useState<User[]>([])
    const [list, setList] = useState<PList[]>([])
    const debounce = useDebounce(params,1000)
    const cilent = useHttp()
    const {run,isLoading,error,data} = useAsync<PList[]>()
    useEffect(() => {
        fetch(`http://localhost:3004/projects?${qs.stringify(cleanObejct(params))}`).then(
            async response => {
                if (response.ok) {
                    setList(await response.json())
                }
            }
        )
    }, [debounce])
    useEffect(() => {
        fetch(`http://localhost:3004/users`).then(
            async response => {
                if (response.ok) {
                    setUser(await response.json())
                }
            }
        )
    }, [params])
    return (
        <div>
            <SearchPanel params={params} setParams={setParams} user={user} />
            <List list={list} user={user} />
        </div>
    )
};

export default ProjectList;
