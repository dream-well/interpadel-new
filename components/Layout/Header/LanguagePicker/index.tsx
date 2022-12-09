import { SelectPicker } from 'rsuite';

export default function LanguagePicker() {
    return (
        <SelectPicker 
            data={langs} 
            defaultValue={'en'} 
            appearance='subtle'
            cleanable={false}
            searchable={false}
            className='w-[7rem] mr-2' 
        />
    )
}

const langs = ['en'].map(lang => ({
    value: lang,
    label: (
        <div className='flex'>
            <img src={`/images/flags/${lang}.png`} />
            <span className='ml-2 text-white'>{ lang.toUpperCase() }</span>
        </div>
    )
}))