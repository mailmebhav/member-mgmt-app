const getAggregateByAgeAndGender = (listData: any): any => {
    let m_lessThanEqual_5 = 0, m_lessThanEqual_15 = 0, m_lessThanEqual_30 =0 , m_lessThanEqual_47 = 0, m_lessThanEqual_60 =0, m_moreThan_60 =0
    let f_lessThanEqual_5 = 0, f_lessThanEqual_15 = 0, f_lessThanEqual_30 =0 , f_lessThanEqual_47 = 0, f_lessThanEqual_60 =0, f_moreThan_60 =0
    let maleTotal = 0, femaleTotal = 0
    listData && listData.map((element: any): any=>
    {

        if(element.gender === 'M')
        {
            maleTotal += 1
        }
        else
        { 
            femaleTotal += 1
        }

        if(element.ageInYrs <= 5)
        {
            if(element.gender === 'M')
            {
                m_lessThanEqual_5 += 1
            }
            else
            { 
                f_lessThanEqual_5 += 1
            }
        }
        else if(element.ageInYrs <= 15)
        {
            if(element.gender === 'M')
                {
                    m_lessThanEqual_15 += 1
                }
                else
                { 
                    f_lessThanEqual_15 += 1
                } 
        }
        else if(element.ageInYrs <= 30)
        {
            if(element.gender === 'M')
                {
                    m_lessThanEqual_30 += 1
                }
                else
                { 
                    f_lessThanEqual_30 += 1
                }  
        }
        else if(element.ageInYrs <= 47)
        {
            if(element.gender === 'M')
                {
                    m_lessThanEqual_47 += 1
                }
                else
                { 
                    f_lessThanEqual_47 += 1
                }   
        }
        else if(element.ageInYrs <= 60)
        {
            if(element.gender === 'M')
                {
                    m_lessThanEqual_60 += 1
                }
                else
                { 
                    f_lessThanEqual_60 += 1
                }    
        }
        else if(element.ageInYrs > 60)
        {
            if(element.gender === 'M')
                {
                    m_moreThan_60 += 1
                }
                else
                { 
                    f_moreThan_60 += 1
                }  
        }        

    })
    let aggregatedOutputResponse =
    {
        category_gender: [
            {
                category: '<= 5 years',
                maleCount: m_lessThanEqual_5,
                femaleCount: f_lessThanEqual_5
             },
             {
                category: '>5 & <= 15 Yrs',
                maleCount: m_lessThanEqual_15,
                femaleCount: f_lessThanEqual_15
             },

             {
                category: '> 15 & <= 30 Yrs	',
                maleCount: m_lessThanEqual_30,
                femaleCount: f_lessThanEqual_30
             },
             {
                category: '> 31 & <= 47 Yrs	',
                maleCount: m_lessThanEqual_47,
                femaleCount: f_lessThanEqual_47
             },
             {
                category: '> 47 & <=60 Yrs	',
                maleCount: m_lessThanEqual_60,
                femaleCount: f_lessThanEqual_60
             },
             {
                category: '> 60 Yrs	',
                maleCount: m_moreThan_60,
                femaleCount: f_moreThan_60
             }
        ],


        consolidated:
            [
                {
                    category: 'BALAK',
                    count: (m_lessThanEqual_5 + f_lessThanEqual_5),
                    percentage: (((m_lessThanEqual_5 + f_lessThanEqual_5) * 100)/(maleTotal+femaleTotal)).toFixed(2) +"%",      
                },
                {
                    category: 'KISHORE',
                    count: (m_lessThanEqual_15 + f_lessThanEqual_15),
                    percentage: (((m_lessThanEqual_15 + f_lessThanEqual_15) * 100)/(maleTotal+femaleTotal)).toFixed(2) +"%",          
                },
                {
                    category: 'YUVAK',
                    count: (m_lessThanEqual_30 + m_lessThanEqual_47 + f_lessThanEqual_30 + f_lessThanEqual_47),
                    percentage: (((m_lessThanEqual_30 + m_lessThanEqual_47 + f_lessThanEqual_30 + f_lessThanEqual_47) * 100)/(maleTotal+femaleTotal)).toFixed(2) +"%",   
                },
                {
                    category: 'VADIL',
                    count: (m_lessThanEqual_60 + f_lessThanEqual_60 + m_moreThan_60 + f_moreThan_60),
                    percentage: (((m_lessThanEqual_60 + f_lessThanEqual_60 + m_moreThan_60 + f_moreThan_60) * 100)/(maleTotal+femaleTotal)).toFixed(2) +"%",    
                }, 
            ]
        }


    return aggregatedOutputResponse
}

export { getAggregateByAgeAndGender }