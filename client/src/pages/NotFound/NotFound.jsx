import { Link } from 'react-router-dom'
import classes from './NotFound.module.css'

export default function NotFound() {
  return (
    <section className={classes.notfound}>
			<div className={classes.overlay}></div>
			<div className={classes.terminal}>
  			<h1 className={classes.error__title}>Error <span className={classes.errorcode}>404</span></h1>
  			<p className={classes.output}>
					Страница, которую вы ищете, могла быть удалена,
					ее название могло быть изменено или она временно недоступна.
				</p>
  			<p className={classes.output}>Попробуйте вернуться {" "}
					<Link to="/">назад</Link>
				</p>
  			<p className={classes.output}>Удачи!</p>
			</div>
    </section>
  )
}

