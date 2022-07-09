import React, {useEffect, useState } from 'react';
function Settings() {

    const [options, setOptions] = useState(null);

    const [questionCategory, setQuestionCategory] = useState("");

    useEffect(() => {
        const apiUrl = `https://opentdb.com/api_category.php`;

        fetch(apiUrl)
            .then((res) => res.json())
            .then((response) => {
              setOptions(response.trivia_categories);
            });
        }, [setOptions]);

        const handleCategoryChange = event => {
    setQuestionCategory(event.target.value)
    }

    return(
    <div>
      </div>
           <h2>Select Category:</h2>
            <select value={questionCategory} onChange={handleCategoryChange}>
              <options>All</options>
                {options &&
                     options.map((option) => (
                     <option value={option.id} key={option.id}>
                     {option.name}
               </option>
                ))}
            </select>
     </div>
    </div>
    );
}
export default Settings;