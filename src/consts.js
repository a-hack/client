import PropTypes from "prop-types";

export const api = "/api/v1";

export const WidgetProps = {
	q: PropTypes.object.isRequired,
	app: PropTypes.object.isRequired,
	config: PropTypes.object.isRequired,
	save: PropTypes.func.isRequired,
};
