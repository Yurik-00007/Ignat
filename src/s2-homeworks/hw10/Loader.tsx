import s from './Loader.module.css'
import preloader from './Spinner-1s-200px.svg';

export const Loader = () => <div className={s.loader}>
    <img src={preloader}/>
</div>
