import "@testing-library/jest-dom";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import routes from "../routes";

describe("App Routing Tests", () => {
  test('renders the Home component on route "/"', async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/"],
    });
    render(<RouterProvider router={router} />);

    // Wait for "Home Page" text to appear
    const homePage = await screen.findByText(/Home Page/);
    expect(homePage).toBeInTheDocument();
  });

  test('renders the Actors component on route "/actors"', async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/actors"],
    });
    render(<RouterProvider router={router} />);

    // Wait for "Actors Page" text to appear
    const actorsPage = await screen.findByText(/Actors Page/);
    expect(actorsPage).toBeInTheDocument();
  });

  test('renders the Directors component on route "/directors"', async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/directors"],
    });
    render(<RouterProvider router={router} />);

    // Wait for "Directors Page" text to appear
    const directorsPage = await screen.findByText(/Directors Page/);
    expect(directorsPage).toBeInTheDocument();
  });

  test('renders the Movie component on route "/movie/:id"', async () => {
    const id = 1;
    const router = createMemoryRouter(routes, {
      initialEntries: [`/movie/${id}`],
    });
    render(<RouterProvider router={router} />);

    // Wait for movie title "Doctor Strange" to appear
    const movieTitle = await screen.findByText(/Doctor Strange/);
    expect(movieTitle).toBeInTheDocument();
  });

  test("renders an error page when given a bad URL", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/bad-route"],
    });
    render(<RouterProvider router={router} />);

    // Wait for error message text to appear
    const errorMessage = await screen.findByText(
      /Oops! Looks like something went wrong./
    );
    expect(errorMessage).toBeInTheDocument();
  });
});
