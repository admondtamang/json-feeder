import React, { useState } from 'react';
import { Box, Button, HStack } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import CustomFields from '../../components/CustomFields';
import axios from 'axios';
import dynamic from 'next/dynamic';
import JsonEditorField from '../../components/FormComponents/JsonEditorField';

const ReactJson = dynamic(() => import('react-json-view'), { ssr: false });

export default function JsonFeeder() {
  const [jsonView, setjsonView] = useState({});
  const [finalJson, setFinalJson] = useState({});
  const formFields = [
    {
      name: 'product_ids',
      label: 'Products Ids',
      type: 'InputField',
      placeholder: 'Enter product Ids',
      isRequired: true,
    },
    {
      name: 'title',
      label: 'Title',
      type: 'InputField',
      placeholder: 'Enter product name',
      isRequired: true,
    },
    {
      type: 'InputField',
      label: 'Icon Name',
      name: 'icon',
      placeholder: 'Enter short description',
      isRequired: true,
    },
    {
      type: 'PriceField',
      name: 'category_id',
      placeholder: 'Enter category Id',
      isRequired: true,
    },
    // {
    //   type: 'TagsInput',
    //   name: 'tags',
    //   placeholder: 'Enter short description',
    //   isRequired: false,
    // },
  ];
  return (
    <div className="flex justify-between">
      <>
        <Formik
          initialValues={{ product_ids: '3645,3643', description: '' }}
          onSubmit={async (values: any, actions) => {
            const data = values.product_ids.replace(/ /g, '').split(',');
            values.product_ids = data;
            console.log(values);

            //   const formData = new FormData();
            //   const result = Object.entries(values).map(([key, value]: any) => formData.append(key, value));
            const response = await axios.post('api/feeder', values);
            setjsonView(response.data.data);
            actions.setSubmitting(false);
          }}
        >
          {(props: any) => (
            <Form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <CustomFields fields={formFields} />
              {/* <JsonEditorField name="sdf" json={jsonView} /> */}

              <Button mt={4} colorScheme="teal" isLoading={props.isSubmitting} type="submit">
                Submit
              </Button>
            </Form>
          )}
        </Formik>

        <div className="mt-5 p-5">
          <h1>Products Output</h1>
          <ReactJson src={jsonView} />
        </div>
      </>
      <>
        <h1>Final JSON Output</h1>
        {/* <ReactJson src={jsonView} /> */}
      </>
    </div>
  );
}
