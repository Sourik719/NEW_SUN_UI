import { useState } from 'react';
import { FaStar } from 'react-icons/fa6';

const StarRating = ({ totalStars, onStarChange}) => {
    const [selectedStars, setSelectedStars] = useState(0);

    const handleClick = (star) => {
        setSelectedStars(star);
        onStarChange(star);
    };

    return (
        <div className='flex flex-row px-5 items-center py-2'>
            {[...Array(totalStars)].map((_, index) => {
                const starValue = index + 1;
                return (
                    <FaStar
                        key={index}
                        onClick={() => handleClick(starValue)}
                        color={starValue <= selectedStars ? '#ffc107' : '#e4e5e9'}
                        size={35}
                        style={{ cursor: 'pointer' }}

                    />
                );
            })}
        </div>
    );
};

export default StarRating;
