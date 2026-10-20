import { useState } from 'react';
import { FaStar } from 'react-icons/fa6';

const StarRating = ({ totalStars, onStarChange, givenStars, editAble }) => {
    const [selectedStars, setSelectedStars] = useState(givenStars);

    const handleClick = (star) => {
        if (editAble) {
            setSelectedStars(star);
            onStarChange(star);
        }
    };

    return (
        <div className="flex flex-row items-center gap-1 py-2" role={editAble ? "radiogroup" : undefined} aria-label="Rating">
            {[...Array(totalStars)].map((_, index) => {
                const starValue = index + 1;
                return (
                    editAble ? (
                    <button
                        key={index}
                        type="button"
                        role="radio"
                        aria-checked={starValue === selectedStars}
                        aria-label={`${starValue} star${starValue > 1 ? 's' : ''}`}
                        onClick={() => handleClick(starValue)}
                        className="rounded p-1 transition hover:scale-110 focus:outline-none focus:ring-2 focus:ring-orange-300"
                    >
                        <FaStar
                            color={starValue <= selectedStars ? '#f59e0b' : '#d6d3d1'}
                            size={28}
                        />
                    </button>
                    ) : (
                    <FaStar
                        key={index}
                        color={starValue <= selectedStars ? '#f59e0b' : '#d6d3d1'}
                        size={22}

                    />
                    )
                );
            })}
        </div>
    );
};

export default StarRating;
