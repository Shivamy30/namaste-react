import ItemList from "./ItemList";

const RestaurantCategory = ({ data,showItems, setShowItemsFromChild }) => {
    const handleClick = () => {
        setShowItemsFromChild();
    };
    return (
        <div className="w-6/12 bg-gray-50 my-4 mx-auto shadow-lg p-4">
            <div className=" flex justify-between" onClick={handleClick}>
                <div className="font-bold text-lg">{data.title} ({data.itemCards.length})</div>
                <div className={showItems ? 'rotate-180' : 'rotate-0'}>⬇</div>
            </div>
            {showItems && <ItemList items={data.itemCards} />}
        </div>
    )
}

export default RestaurantCategory;