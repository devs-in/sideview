// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	//read configurations 

	const configured = vscode.workspace.getConfiguration().get('conf.settings.sideview');
	console.log(configured);

	// register settings update command
	context.subscriptions.push(vscode.commands.registerCommand('sidview.configure', async () => {
				// 1) Getting the url
				const localhostUrl = await vscode.window.showInputBox({ placeHolder: 'Enter the host url:' });

				// 2) Update
				vscode.workspace.getConfiguration().update('conf.settings.sideview', localhostUrl);

				// for test
				const updated = vscode.workspace.getConfiguration().get('conf.settings.sideview');
				console.log(updated);
	}));

	let disposable = vscode.commands.registerCommand('sideview.open', () => {
		vscode.window.showInformationMessage('Hellow VSCode!!');

		const panel = vscode.window.createWebviewPanel(
			'sideview',
			'SideView',
			vscode.ViewColumn.Two,
			{
				enableScripts: true
			}
		);
		
		panel.webview.html = `<iframe src='${vscode.workspace.getConfiguration().get('conf.settings.sideview')}'></iframe>`

	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
