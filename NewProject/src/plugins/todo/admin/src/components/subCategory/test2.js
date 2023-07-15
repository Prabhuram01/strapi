import React, { useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { Select, Option } from '@strapi/design-system/Select'
import { Stack } from '@strapi/design-system';
import sharedVariable from '../../../../../restaurant/admin/src/components/RestaurantForm/shared';
import { Button } from '@strapi/design-system';
import { useIntl } from 'react-intl'

const MultiSelect = ({
    value,
    onChange,
    name,
    intlLabel,
    required,
    attribute,
    description,
    placeholder,
    disabled,
    error,
}) => {
    const { formatMessage } = useIntl()
    const handleRefreshUsers = async () => {
        console.log(selectedCat)
        console.log("inside handler")
        await setSelectedCat(sharedVariable.value)
    };
    const [selectedCat, setSelectedCat] = useState(sharedVariable.value)
    console.log(typeof (attribute['options']))
    let dummyOptions = ['abc', 'asd']
    const possibleOptions = useMemo(() => {
        console.log("inside possibleoptions", selectedCat, typeof (selectedCat))
        return (selectedCat || []).map((option) => {
            const [label, value] = [option, option]
            if (!label || !value) return null
            return { label, value }
        }).filter(Boolean)
    }, [selectedCat])

    const sanitizedValue = useMemo(() => {
        console.log("inside sanitiser")
        let parsedValue
        try {
            parsedValue = JSON.parse(value || '[]')
            console.log(parsedValue)
        } catch (e) {
            parsedValue = []
        }
        return !Array.isArray(parsedValue)
            ? parsedValue.filter((val) =>
                possibleOptions.some((option) => option.value === val),
                console.log("inside isarray")
            )
            : ["dvcbd"]
        // return new Array("dsjvbd", "cds")
    }, [value, possibleOptions])
    console.log("sanitizedValue", sanitizedValue)
    console.log("sanitizedValue", typeof (sanitizedValue))
    console.log("Value", typeof (value))
    console.log("Value", value)

    return (
        <Stack>
            <Button onClick={handleRefreshUsers}>Fetch Subcats</Button>
            <Select
                name={name}
                id={name}
                label={formatMessage(intlLabel)}
                error={
                    error || (required && !possibleOptions.length ? 'No options' : null)
                }
                disabled={disabled}
                required={required}
                // hint={description}
                hint={description && formatMessage(description)}
                onChange={(v) => {
                    onChange({
                        target: {
                            name: name,
                            value: JSON.stringify(v.filter(Boolean)),
                            type: attribute.type,
                        },
                    })
                }}
                placeholder={placeholder}
                multi
                value={value}
                withTags>
                {possibleOptions.map(({ label, value }) => (
                    <Option value={value} key={value}>
                        {label}
                    </Option>
                ))}
            </Select>
        </Stack>
    )
}

MultiSelect.defaultProps = {
    description: null,
    disabled: false,
    error: null,
    labelAction: null,
    required: false,
    value: '',
}

MultiSelect.propTypes = {
    intlLabel: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    attribute: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.object,
    disabled: PropTypes.bool,
    error: PropTypes.string,
    labelAction: PropTypes.object,
    required: PropTypes.bool,
    value: PropTypes.string,
}

export default MultiSelect
