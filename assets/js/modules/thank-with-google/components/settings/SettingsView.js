/**
 * Thank with Google Settings View component.
 *
 * Site Kit by Google, Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import Data from 'googlesitekit-data';
import { CORE_SITE } from '../../../../googlesitekit/datastore/site/constants';
import { MODULES_THANK_WITH_GOOGLE } from '../../datastore/constants';
import { Cell, Grid, Row } from '../../../../material-components';
import DisplaySetting from '../../../../components/DisplaySetting';
import StoreErrorNotices from '../../../../components/StoreErrorNotices';
import Link from '../../../../components/Link';
import ProgressBar from '../../../../components/ProgressBar';
import {
	getColorThemes,
	getType,
	getProminence,
	getCTAPostTypesString,
} from '../../util/settings';
const { useSelect } = Data;

export default function SettingsView() {
	const publicationID = useSelect( ( select ) =>
		select( MODULES_THANK_WITH_GOOGLE ).getPublicationID()
	);
	const supporterWallSidebars = useSelect( ( select ) =>
		select( MODULES_THANK_WITH_GOOGLE ).getSupporterWallSidebars()
	);
	const colorTheme = useSelect( ( select ) =>
		select( MODULES_THANK_WITH_GOOGLE ).getColorTheme()
	);

	const ctaPlacement = useSelect( ( select ) =>
		select( MODULES_THANK_WITH_GOOGLE ).getCTAPlacement()
	);

	const supporterWallURL = useSelect( ( select ) =>
		select( CORE_SITE ).getWidgetsAdminURL()
	);

	const postTypes = useSelect( ( select ) =>
		select( CORE_SITE ).getPostTypes()
	);

	const ctaPostTypes = useSelect( ( select ) =>
		select( MODULES_THANK_WITH_GOOGLE ).getCTAPostTypes()
	);

	// Bail if the values aren't ready.
	if (
		[ publicationID, ctaPlacement, colorTheme, ctaPostTypes ].includes(
			undefined
		)
	) {
		return null;
	}

	let supporterWall;

	if ( supporterWallSidebars === undefined ) {
		supporterWall = <ProgressBar small />;
	} else if ( supporterWallSidebars.length > 0 ) {
		supporterWall = (
			<p className="googlesitekit-settings-module__meta-item-data">
				<DisplaySetting value={ supporterWallSidebars.join( ', ' ) } />
			</p>
		);
	} else {
		supporterWall = (
			<p className="googlesitekit-settings-module__meta-item-data">
				<Link
					href={ supporterWallURL }
					className="googlesitekit-settings-module__cta-button"
				>
					{ __( 'Add supporter wall', 'google-site-kit' ) }
				</Link>
			</p>
		);
	}

	const { name: colorName } =
		getColorThemes().find(
			( { colorThemeID } ) => colorThemeID === colorTheme
		) || {};

	return (
		<Grid>
			<StoreErrorNotices
				moduleSlug="thank-with-google"
				storeName={ MODULES_THANK_WITH_GOOGLE }
			/>

			<Row>
				<Cell className="googlesitekit-settings-module__meta-item">
					<h5 className="googlesitekit-settings-module__meta-item-type">
						{ __( 'Publication ID', 'google-site-kit' ) }
					</h5>
					<p className="googlesitekit-settings-module__meta-item-data">
						<DisplaySetting value={ publicationID } />
					</p>
				</Cell>
				<Cell className="googlesitekit-settings-module__meta-item">
					<h5 className="googlesitekit-settings-module__meta-item-type">
						{ __( 'Supporter Wall Widget', 'google-site-kit' ) }
					</h5>
					{ supporterWall }
				</Cell>
			</Row>

			<Row>
				<Cell className="googlesitekit-settings-module__meta-item">
					<h5 className="googlesitekit-settings-module__meta-item-type">
						{ __( 'Type', 'google-site-kit' ) }
					</h5>
					<p className="googlesitekit-settings-module__meta-item-data">
						<DisplaySetting value={ getType( ctaPlacement ) } />
					</p>
				</Cell>
				<Cell className="googlesitekit-settings-module__meta-item">
					<h5 className="googlesitekit-settings-module__meta-item-type">
						{ __( 'Color', 'google-site-kit' ) }
					</h5>
					<p className="googlesitekit-settings-module__meta-item-data">
						<DisplaySetting value={ colorName } />
					</p>
				</Cell>
			</Row>

			<Row>
				<Cell className="googlesitekit-settings-module__meta-item">
					<h5 className="googlesitekit-settings-module__meta-item-type">
						{ __( 'Prominence', 'google-site-kit' ) }
					</h5>
					<p className="googlesitekit-settings-module__meta-item-data">
						<DisplaySetting
							value={ getProminence( ctaPlacement ) }
						/>
					</p>
				</Cell>
				<Cell className="googlesitekit-settings-module__meta-item">
					<h5 className="googlesitekit-settings-module__meta-item-type">
						{ __( 'Post Types', 'google-site-kit' ) }
					</h5>
					<p className="googlesitekit-settings-module__meta-item-data">
						<DisplaySetting
							value={ getCTAPostTypesString(
								ctaPostTypes,
								postTypes
							) }
						/>
					</p>
				</Cell>
			</Row>
		</Grid>
	);
}
