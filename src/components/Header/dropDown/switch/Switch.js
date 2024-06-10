
import { ReactComponent as FullStar } from '../../../img/star-chose.svg'
import { ReactComponent as EmptyStar } from '../../../img/star-empty.svg'
import './switch.css'

export const renderListData = (data, FavoritCoin, favorit) =>
  data.map((el, index) => (
    <div
    className='coin'>
      <li key={index} className='coins-list-item'>
        <button className='coin-item-btn' onClick={() => FavoritCoin(el)}>
          {favorit.includes(el) ? <FullStar className='ico' /> : <EmptyStar className='ico' />}
        </button>
        {el}
      </li>
    </div>
  ))

 const SwitchContainer = ({ isFavorites, handleClickSwitch }) => (
  <div className='searchBtn'>
    <button
      className={`listBtn ${isFavorites ? 'active' : ''}`}
      onClick={(event) => handleClickSwitch({ btn: 'fav-btn' , event})}
    >
      <FullStar className='fullStar' />
      Favorites
    </button>
    <button
      className={`listBtn ${!isFavorites ? 'active' : ''}`}
      onClick={(event) => handleClickSwitch({ btn: 'all' , event})}
    >
      All coins
    </button>
  </div>
)

export default SwitchContainer 