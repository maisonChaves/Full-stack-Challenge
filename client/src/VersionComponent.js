import {version} from 'inferno';

function showVersion() {
	alert(`Version: ${ version }!`);
}

export default function VersionComponent() {
	return (
		<div class="subtitle">
			<button class="button" onClick={ showVersion }>Show version</button>
		</div>
	);
}
