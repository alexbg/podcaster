import clsx from "clsx";
import { NavLink, useNavigation } from "react-router";

export default function Header() {
  const navigation = useNavigation();
  const isNavigating = Boolean(navigation.location);

  const singClassName = clsx(
    'sign',
    isNavigating && 'sign--pulse'
  )

  return (
    <header>
      <div className='container container__header'>
        <h1>
          <NavLink to='/'>Podcasts</NavLink>
        </h1>
        <span className={singClassName} />
      </div>
    </header>
  )
}