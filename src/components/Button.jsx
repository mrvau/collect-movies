import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"

const Button = ({direction, isDisabled, page, setPage}) => {
    const handleClick = () => {
        if (direction === 'left') {
            if (page === 1) {
                return;
            }
            setPage((prev) => prev - 1);
        } else {
            if (page === 50) {
                return;
            }
            setPage(prev => prev + 1);
        }
    }
    return (
        <button
            onClick={handleClick}
            disabled={isDisabled}
            className={isDisabled ? "cursor-not-allowed" : "cursor-pointer"}>
            <FontAwesomeIcon icon={`arrow-${direction}`}/>
        </button>
    );
}

export default Button