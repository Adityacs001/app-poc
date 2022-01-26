import * as React from "react";
import {
  Grid,
  Col,
  InputWrapper,
  Input,
  List,
  Blockquote,
  ThemeIcon,
  Title,
  Paper,
  Text,
} from "@mantine/core";
import { AcademicCapIcon } from "@heroicons/react/outline";

import dynamic from "next/dynamic";

const RichTextEditor = dynamic(() => import("@mantine/rte"), {
  // Disable during server side rendering
  ssr: false,
});

const Sample: React.FC = () => (
  <Grid id="my-grid">
    <Col span={12}>
      <Title order={1}>This is h1 title</Title>
    </Col>
    <Col span={4}>
      <InputWrapper
        id="input-demo"
        required
        label="Credit card information"
        description="Please enter your credit card information, we need some money"
        error="Your credit card expired"
      >
        <Input id="input-demo" placeholder="Your email" />
      </InputWrapper>
    </Col>
    <Col span={4}>
      <List
        className="prose prose-lg"
        icon={
          <ThemeIcon color="teal" size={24} radius="xl">
            <AcademicCapIcon width={24} height={24} />
          </ThemeIcon>
        }
      >
        <List.Item>Clone or download repository from GitHub</List.Item>
        <List.Item>Install dependencies with yarn</List.Item>
        <List.Item>To start development server run npm start command</List.Item>
        <List.Item>
          Run tests to make sure your changes do not break the build
        </List.Item>
        <List.Item>Submit a pull request once you are done</List.Item>
      </List>
    </Col>
    <Col span={4}>
      <Blockquote cite="– Forrest Gump">
        Life is like an npm install – you never know what you are going to get.
      </Blockquote>

      <Paper padding="md" shadow="xs">
        <Text>Paper is the most basic ui component</Text>
        <Text>
          Use it to create cards, dropdowns, modals and other components that
          require background with shadow
        </Text>
      </Paper>
    </Col>
    <Col span={12}>
      <RichTextEditor
        value={`<p>Your initial <b>html value</b> or an empty string to init editor without value</p>`}
        onChange={(e) => console.log(e)}
      />
    </Col>
  </Grid>
);

export default Sample;
